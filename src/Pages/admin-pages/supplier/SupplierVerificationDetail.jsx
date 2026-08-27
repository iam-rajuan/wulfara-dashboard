import React, { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useGetListingQuery,
  useReviewListingMutation,
  useUpdateSupplierVerificationMutation,
} from "../../../redux/features/listings/listingsApi";
import {
  ChevronRight,
  MessageCircle,
  Factory,
  MapPin,
  Clock,
  FileText,
  Eye,
  CheckCircle,
  XCircle,
  Ban,
  PauseCircle,
  Check,
  Mail,
  Phone,
  Globe,
  Building2,
  CreditCard,
  Layers3,
  ShieldCheck,
  CalendarDays,
} from "lucide-react";

const REVIEWABLE_DOCUMENT_TYPES = new Set(["Certificates"]);

const formatDate = (value, options = {}) => {
  if (!value) {
    return "N/A";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "N/A";
  }

  return date.toLocaleDateString(undefined, options);
};

const formatDateTime = (value) => {
  if (!value) {
    return "N/A";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "N/A";
  }

  return date.toLocaleString();
};

const formatRelativeTime = (value) => {
  if (!value) {
    return "Upload date unavailable";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "Upload date unavailable";
  }

  const diffMs = Date.now() - date.getTime();
  const diffMinutes = Math.max(0, Math.floor(diffMs / 60000));

  if (diffMinutes < 1) {
    return "Uploaded just now";
  }

  if (diffMinutes < 60) {
    return `Uploaded ${diffMinutes} minute${diffMinutes === 1 ? "" : "s"} ago`;
  }

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) {
    return `Uploaded ${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
  }

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 30) {
    return `Uploaded ${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
  }

  return `Uploaded on ${formatDate(date)}`;
};

const formatCurrency = (value) => {
  if (typeof value !== "number") {
    return "N/A";
  }

  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
};

const getDocumentStatusClasses = (status) => {
  if (status === "Approved") {
    return "bg-[#DCFCE7] text-[#166534]";
  }

  if (status === "Rejected") {
    return "bg-[#FEE2E2] text-[#991B1B]";
  }

  return "bg-[#FEF3C7] text-[#D97706]";
};

const getVerificationBadge = (status) => {
  if (status === "Approved") {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#DCFCE7] text-[#166534] border border-[#BBF7D0] text-[11px] font-bold rounded-full">
        <CheckCircle size={12} />
        Approved Supplier
      </span>
    );
  }

  if (status === "Rejected") {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FEE2E2] text-[#991B1B] border border-[#FECACA] text-[11px] font-bold rounded-full">
        <Ban size={12} />
        Application Rejected
      </span>
    );
  }

  if (status === "Suspended") {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F3E8FF] text-[#7E22CE] border border-[#E9D5FF] text-[11px] font-bold rounded-full">
        <PauseCircle size={12} />
        Suspended
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FEF3C7] text-[#D97706] border border-[#FDE68A] text-[11px] font-bold rounded-full">
      <Clock size={12} />
      Pending Verification
    </span>
  );
};

const InfoGrid = ({ items }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {items.map((item) => (
        <div key={item.label} className="rounded-lg border border-gray-100 bg-[#F8F9FB] p-4">
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">{item.label}</p>
          {item.href && item.value !== "N/A" ? (
            <a
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noreferrer" : undefined}
              className="text-[14px] font-semibold text-[#2563EB] break-all"
            >
              {item.value}
            </a>
          ) : (
            <p className="text-[14px] font-semibold text-[#0F172A] break-words whitespace-pre-wrap">{item.value}</p>
          )}
        </div>
      ))}
    </div>
  </div>
);

export default function SupplierVerificationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Company Documents");

  const { data: response, isLoading } = useGetListingQuery(id, {
    refetchOnMountOrArgChange: true,
  });
  const supplier = response?.data;

  const [reviewListing, { isLoading: isReviewing }] = useReviewListingMutation();
  const [updateVerification, { isLoading: isSavingVerification }] = useUpdateSupplierVerificationMutation();

  const verificationStatus = supplier?.listingStatus || (supplier?.isApproved ? "Approved" : "Pending");
  const checklist = supplier?.verificationChecklist || {
    identity: false,
    business: false,
    tax: false,
  };

  const verificationDocuments = useMemo(() => {
    const apiDocuments = Array.isArray(supplier?.verificationDocuments) ? supplier.verificationDocuments : [];
    if (apiDocuments.length > 0) {
      return apiDocuments;
    }

    return (supplier?.gallery || [])
      .filter((item) => item?.url && (item?.isPdf || REVIEWABLE_DOCUMENT_TYPES.has(item?.type)))
      .map((item) => ({
        id: item._id || item.url,
        title: item.title || "Document",
        size: item.size || "",
        url: item.url,
        uploadedAt: item.uploadedAt || supplier?.updatedAt || supplier?.createdAt || null,
        reviewStatus: item.reviewStatus || "Pending Review",
        reviewedAt: item.reviewedAt || null,
        reviewedBy: item.reviewedBy || null,
      }));
  }, [supplier]);

  const latestPayment = supplier?.paymentSummary?.latestPayment || null;
  const paymentHistory = supplier?.paymentSummary?.history || [];
  const listingSummary = supplier?.listingSummary || {};
  const profileImage =
    (supplier?.logo && supplier.logo !== "no-logo.jpg" && supplier.logo) ||
    (supplier?.user?.avatar && supplier.user.avatar !== "default-avatar.png" && supplier.user.avatar) ||
    "";
  const displayLocation =
    supplier?.location?.formattedAddress ||
    supplier?.contactInfo?.address ||
    supplier?.contactAddress ||
    supplier?.address ||
    "Location not provided";

  const handleStatusUpdate = async (status) => {
    try {
      await reviewListing({ id, listingStatus: status }).unwrap();
      toast.success(`Supplier status updated to ${status}`);
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update status");
    }
  };

  const handleChecklistToggle = async (key) => {
    try {
      await updateVerification({
        id,
        data: { checklist: { [key]: !checklist?.[key] } },
      }).unwrap();
      toast.success("Verification checklist updated");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update checklist");
    }
  };

  const handleDocAction = async (documentId, reviewStatus) => {
    try {
      await updateVerification({
        id,
        data: {
          documents: [{ id: documentId, reviewStatus }],
        },
      }).unwrap();
      toast.success(`Document marked as ${reviewStatus}`);
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update document status");
    }
  };

  const handleContactSupplier = () => {
    const recipientId = supplier?.user?._id;
    const recipientName = supplier?.companyName || supplier?.user?.name || "Supplier";

    if (recipientId) {
      navigate(`/messages?new=${recipientId}&name=${encodeURIComponent(recipientName)}`);
      return;
    }

    if (supplier?.contactEmail) {
      window.location.href = `mailto:${supplier.contactEmail}`;
      return;
    }

    toast.info("No supplier contact channel is available yet.");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen p-6 mt-16 lg:p-8 bg-[#F8F9FB] text-[#0F172A] font-sans pt-24 flex justify-center items-center">
        Loading supplier data...
      </div>
    );
  }

  if (!supplier) {
    return (
      <div className="min-h-screen p-6 mt-16 lg:p-8 bg-[#F8F9FB] text-[#0F172A] font-sans pt-24 flex justify-center items-center">
        Supplier not found.
      </div>
    );
  }

  const accountItems = [
    { label: "Company Name", value: supplier.companyName || "N/A" },
    { label: "Owner Name", value: supplier.user?.name || "N/A" },
    { label: "Owner Email", value: supplier.user?.email || supplier.contactEmail || "N/A" },
    { label: "Account Role", value: supplier.user?.role || "supplier" },
    { label: "User Status", value: supplier.user?.status || "N/A" },
    { label: "User Verified", value: supplier.user?.isVerified ? "Yes" : "No" },
    { label: "Supplier ID", value: supplier._id || "N/A" },
    { label: "Created At", value: formatDateTime(supplier.createdAt) },
    { label: "Last Updated", value: formatDateTime(supplier.updatedAt) },
    {
      label: "Checklist Last Updated",
      value: checklist.updatedAt ? formatDateTime(checklist.updatedAt) : "Not reviewed yet",
    },
  ];

  const contactItems = [
    { label: "Primary Email", value: supplier.contactEmail || supplier.user?.email || "N/A" },
    { label: "Primary Phone", value: supplier.contactPhone || "N/A" },
    { label: "Address", value: displayLocation },
    {
      label: "Website",
      value: supplier.website || "N/A",
      href: supplier.website || undefined,
      external: true,
    },
    { label: "Supplier Type", value: supplier.supplierType || "N/A" },
    {
      label: "Service Areas",
      value: supplier.serviceAreas?.length ? supplier.serviceAreas.join(", ") : "N/A",
    },
  ];

  const paymentItems = [
    {
      label: "Selected Plan",
      value: supplier.selectedPlan?.name || supplier.subscriptionPlan || "N/A",
    },
    {
      label: "Billing Cycle",
      value: supplier.selectedBillingCycle || latestPayment?.billingCycle || "N/A",
    },
    {
      label: "Listing Period",
      value: supplier.selectedListingPeriod || latestPayment?.listingPeriod || "N/A",
    },
    {
      label: "Subscription Status",
      value: supplier.subscriptionStatus || "N/A",
    },
    {
      label: "Payment Status",
      value: supplier.paymentStatus || latestPayment?.status || "N/A",
    },
    {
      label: "Latest Payment Amount",
      value: latestPayment ? formatCurrency(latestPayment.amount) : "N/A",
    },
    {
      label: "Latest Payment Date",
      value: latestPayment?.createdAt ? formatDateTime(latestPayment.createdAt) : "N/A",
    },
    {
      label: "Invoice",
      value: latestPayment?.invoiceUrl ? "Open invoice" : "N/A",
      href: latestPayment?.invoiceUrl || undefined,
      external: true,
    },
    {
      label: "Total Paid",
      value: typeof supplier.paymentSummary?.totalPaidAmount === "number"
        ? formatCurrency(supplier.paymentSummary.totalPaidAmount)
        : "N/A",
    },
    {
      label: "Payments Recorded",
      value: String(supplier.paymentSummary?.paymentCount || 0),
    },
  ];

  const listingItems = [
    { label: "Listing Status", value: verificationStatus },
    { label: "Publicly Visible", value: listingSummary.isPubliclyVisible ? "Yes" : "No" },
    { label: "Onboarding Step", value: listingSummary.onboardingStep || supplier.onboardingStep || "N/A" },
    {
      label: "Onboarding Completed",
      value: listingSummary.onboardingCompletedAt ? formatDateTime(listingSummary.onboardingCompletedAt) : "Not completed",
    },
    { label: "Featured", value: supplier.isFeatured ? "Yes" : "No" },
    {
      label: "Featured Hero Placement",
      value: supplier.featuredHeroPlacement?.enabled ? "Active" : "Inactive",
    },
    {
      label: "Current Month Views",
      value: String(listingSummary.currentMonthViews || 0),
    },
    {
      label: "Total Recorded Views",
      value: String(listingSummary.totalRecordedViews || 0),
    },
    {
      label: "Categories",
      value: supplier.categories?.length ? supplier.categories.map((category) => category.name).join(", ") : "N/A",
    },
    {
      label: "Core Products",
      value: supplier.coreProducts?.length ? supplier.coreProducts.join(", ") : "N/A",
    },
  ];

  const renderTabContent = () => {
    if (activeTab === "Account Details") {
      return <InfoGrid items={accountItems} />;
    }

    if (activeTab === "Contact Information") {
      return <InfoGrid items={contactItems} />;
    }

    if (activeTab === "Payment Status") {
      return (
        <div className="space-y-6">
          <InfoGrid items={paymentItems} />

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
            <h3 className="text-[18px] font-bold text-[#0F172A] mb-4">Recent Payments</h3>
            {paymentHistory.length === 0 ? (
              <p className="text-[14px] text-gray-500">No payment records found for this supplier.</p>
            ) : (
              <div className="space-y-3">
                {paymentHistory.slice(0, 5).map((payment) => (
                  <div key={payment._id} className="rounded-lg border border-gray-100 bg-[#F8F9FB] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <p className="text-[14px] font-bold text-[#0F172A]">
                        {payment.planName || payment.plan?.name || "Subscription Payment"}
                      </p>
                      <p className="text-[12px] text-gray-500">
                        {formatDateTime(payment.createdAt)} • {payment.billingCycle || "N/A"} • {payment.listingPeriod || "N/A"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[14px] font-bold text-[#0F172A]">{formatCurrency(payment.amount)}</p>
                      <p className="text-[12px] text-gray-500 capitalize">{payment.status || "N/A"}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      );
    }

    if (activeTab === "Listing") {
      return <InfoGrid items={listingItems} />;
    }

    return (
      <div className="space-y-4">
        <h3 className="text-[18px] font-bold text-[#0F172A] mb-4">Required Documentation</h3>

        {verificationDocuments.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-gray-500">
            No supplier documents have been uploaded yet.
          </div>
        ) : (
          verificationDocuments.map((document) => (
            <div
              key={document.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#F8F9FB] border border-gray-200 flex items-center justify-center text-gray-400 flex-shrink-0">
                  <FileText size={20} />
                </div>
                <div>
                  <h4 className="text-[14px] font-bold text-[#0F172A]">{document.title}</h4>
                  <p className="text-[12px] font-medium text-gray-400">
                    {formatRelativeTime(document.uploadedAt)}
                    {document.size ? ` • ${document.size}` : ""}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 sm:ml-auto">
                <span className={`px-2.5 py-1 text-[11px] font-bold rounded-md whitespace-nowrap ${getDocumentStatusClasses(document.reviewStatus)}`}>
                  {document.reviewStatus}
                </span>

                <div className="flex items-center gap-2 border-l border-gray-200 pl-4">
                  <button
                    onClick={() => window.open(document.url, "_blank", "noopener,noreferrer")}
                    className="text-gray-400 hover:text-gray-600 p-1"
                    title="View document"
                  >
                    <Eye size={18} />
                  </button>
                  <button
                    onClick={() => handleDocAction(document.id, "Approved")}
                    disabled={isSavingVerification}
                    className={`p-1 ${document.reviewStatus === "Approved" ? "text-green-600" : "text-gray-400 hover:text-green-600"} disabled:opacity-50`}
                    title="Approve document"
                  >
                    <CheckCircle size={18} />
                  </button>
                  <button
                    onClick={() => handleDocAction(document.id, "Rejected")}
                    disabled={isSavingVerification}
                    className={`p-1 ${document.reviewStatus === "Rejected" ? "text-red-600" : "text-gray-400 hover:text-red-600"} disabled:opacity-50`}
                    title="Reject document"
                  >
                    <XCircle size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen p-6 mt-16 lg:p-8 bg-[#F8F9FB] text-[#0F172A] font-sans pt-24">
      <div className="flex items-center text-[13px] font-medium text-gray-500 mb-6 gap-2">
        <Link to="/" className="hover:text-gray-700">Admin</Link>
        <ChevronRight size={14} />
        <Link to="/supplier-management" className="hover:text-gray-700">Suppliers</Link>
        <ChevronRight size={14} />
        <span>Verification</span>
        <ChevronRight size={14} />
        <span className="text-[#0F172A] font-bold">{supplier.companyName}</span>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-extrabold text-[#0F172A] tracking-tight">
          Verification Detail
        </h1>
        <button
          onClick={handleContactSupplier}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-md text-[13px] font-bold text-[#0F172A] hover:bg-gray-50 transition-colors shadow-sm"
        >
          <MessageCircle size={16} />
          Contact Supplier
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 relative">
            <div className="absolute top-6 right-6">
              {getVerificationBadge(verificationStatus)}
            </div>

            <div className="flex items-start gap-5">
              <div className="w-[72px] h-[72px] rounded-xl bg-[#F8F9FB] border border-gray-200 flex items-center justify-center flex-shrink-0 overflow-hidden">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt={supplier.companyName || "Supplier"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Factory size={28} className="text-[#475569]" />
                )}
              </div>
              <div className="pt-1">
                <h2 className="text-[22px] font-extrabold text-[#0F172A] mb-1">{supplier.companyName}</h2>
                <div className="flex items-center text-gray-500 text-[13px] font-medium gap-1">
                  <MapPin size={14} />
                  {displayLocation}
                </div>
              </div>
            </div>

            <hr className="my-6 border-gray-100" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Owner / Primary Contact</p>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#DBEAFE] text-[#1E40AF] flex items-center justify-center text-[10px] font-bold">
                    {supplier.user?.name ? supplier.user.name.charAt(0).toUpperCase() : "U"}
                  </div>
                  <span className="text-[14px] font-bold text-[#0F172A]">
                    {supplier.user?.name || supplier.contactEmail || "Unknown"}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Submission Date</p>
                <p className="text-[14px] font-semibold text-[#0F172A]">
                  {formatDate(supplier.createdAt)}
                </p>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-200 flex items-center gap-6 overflow-x-auto no-scrollbar">
            {["Account Details", "Company Documents", "Contact Information", "Payment Status", "Listing"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-[14px] font-bold whitespace-nowrap transition-colors relative ${
                  activeTab === tab ? "text-[#2563EB]" : "text-gray-500 hover:text-gray-800"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#2563EB] rounded-t-md"></div>
                )}
              </button>
            ))}
          </div>

          {renderTabContent()}
        </div>

        <div className="w-full lg:w-[320px] xl:w-[360px] flex-shrink-0 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-[13px] font-bold text-[#0F172A] tracking-wider mb-6">VERIFICATION CHECKLIST</h3>

            <div className="space-y-5">
              <div
                className="flex items-start gap-3 cursor-pointer group"
                onClick={() => handleChecklistToggle("identity")}
              >
                <div className={`mt-0.5 w-[18px] h-[18px] rounded flex items-center justify-center border transition-colors flex-shrink-0 ${checklist.identity ? "bg-[#2563EB] border-[#2563EB]" : "border-gray-300 bg-white group-hover:border-gray-400"}`}>
                  {checklist.identity && <Check size={12} className="text-white" />}
                </div>
                <div>
                  <p className="text-[14px] font-bold text-[#0F172A] leading-none mb-1.5">Identity Verified</p>
                  <p className="text-[12px] font-medium text-gray-400 leading-snug">Match owner ID<br />with records</p>
                </div>
              </div>

              <div
                className="flex items-start gap-3 cursor-pointer group"
                onClick={() => handleChecklistToggle("business")}
              >
                <div className={`mt-0.5 w-[18px] h-[18px] rounded flex items-center justify-center border transition-colors flex-shrink-0 ${checklist.business ? "bg-[#2563EB] border-[#2563EB]" : "border-gray-300 bg-white group-hover:border-gray-400"}`}>
                  {checklist.business && <Check size={12} className="text-white" />}
                </div>
                <div>
                  <p className="text-[14px] font-bold text-[#0F172A] leading-none mb-1.5">Business Registration Valid</p>
                  <p className="text-[12px] font-medium text-gray-400 leading-snug">Check state registry</p>
                </div>
              </div>

              <div
                className="flex items-start gap-3 cursor-pointer group"
                onClick={() => handleChecklistToggle("tax")}
              >
                <div className={`mt-0.5 w-[18px] h-[18px] rounded flex items-center justify-center border transition-colors flex-shrink-0 ${checklist.tax ? "bg-[#2563EB] border-[#2563EB]" : "border-gray-300 bg-white group-hover:border-gray-400"}`}>
                  {checklist.tax && <Check size={12} className="text-white" />}
                </div>
                <div>
                  <p className="text-[14px] font-bold text-[#0F172A] leading-none mb-1.5">Tax Status Confirmed</p>
                  <p className="text-[12px] font-medium text-gray-400 leading-snug">Review uploaded<br />certificates</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-[13px] font-bold text-[#0F172A] tracking-wider mb-4">LIVE SUMMARY</h3>

            <div className="space-y-4 text-[13px]">
              <div className="flex items-start gap-3">
                <Mail size={16} className="text-[#64748B] mt-0.5" />
                <div>
                  <p className="font-bold text-[#0F172A]">Email</p>
                  <p className="text-gray-500 break-all">{supplier.contactEmail || supplier.user?.email || "N/A"}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={16} className="text-[#64748B] mt-0.5" />
                <div>
                  <p className="font-bold text-[#0F172A]">Phone</p>
                  <p className="text-gray-500">{supplier.contactPhone || "N/A"}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Globe size={16} className="text-[#64748B] mt-0.5" />
                <div>
                  <p className="font-bold text-[#0F172A]">Website</p>
                  <p className="text-gray-500 break-all">{supplier.website || "N/A"}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Building2 size={16} className="text-[#64748B] mt-0.5" />
                <div>
                  <p className="font-bold text-[#0F172A]">Supplier Type</p>
                  <p className="text-gray-500">{supplier.supplierType || "N/A"}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CreditCard size={16} className="text-[#64748B] mt-0.5" />
                <div>
                  <p className="font-bold text-[#0F172A]">Latest Payment</p>
                  <p className="text-gray-500">{latestPayment ? `${formatCurrency(latestPayment.amount)} • ${latestPayment.status}` : "No payment recorded"}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Layers3 size={16} className="text-[#64748B] mt-0.5" />
                <div>
                  <p className="font-bold text-[#0F172A]">Current Plan</p>
                  <p className="text-gray-500">{supplier.selectedPlan?.name || supplier.subscriptionPlan || "N/A"}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck size={16} className="text-[#64748B] mt-0.5" />
                <div>
                  <p className="font-bold text-[#0F172A]">Documents Reviewed</p>
                  <p className="text-gray-500">
                    {verificationDocuments.filter((item) => item.reviewStatus === "Approved").length} approved / {verificationDocuments.length} total
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CalendarDays size={16} className="text-[#64748B] mt-0.5" />
                <div>
                  <p className="font-bold text-[#0F172A]">Checklist Updated</p>
                  <p className="text-gray-500">{checklist.updatedAt ? formatDateTime(checklist.updatedAt) : "Not updated yet"}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border-2 border-[#2563EB]/20 p-6">
            <h3 className="text-[13px] font-bold text-[#0F172A] tracking-wider mb-4">ADMIN DECISION</h3>

            <p className="text-[13px] font-medium text-gray-500 mb-6 leading-relaxed">
              Finalize verification status for {supplier.companyName}.<br />
              This action will notify the user.
            </p>

            <div className="space-y-3">
              <button
                onClick={() => handleStatusUpdate("Approved")}
                disabled={isReviewing || isSavingVerification}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#D4AF37] rounded-md text-[13px] font-bold text-[#0F172A] hover:bg-[#C2982B] transition-colors shadow-sm disabled:opacity-50"
              >
                <CheckCircle size={16} className="fill-[#0F172A] text-[#D4AF37]" strokeWidth={1} />
                Approve Supplier
              </button>

              <button
                onClick={() => handleStatusUpdate("Rejected")}
                disabled={isReviewing || isSavingVerification}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-white border border-[#EF4444] rounded-md text-[13px] font-bold text-[#EF4444] hover:bg-red-50 transition-colors shadow-sm disabled:opacity-50"
              >
                <Ban size={16} />
                Reject Application
              </button>

              <button
                onClick={() => handleStatusUpdate("Suspended")}
                disabled={isReviewing || isSavingVerification}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-white border border-gray-200 rounded-md text-[13px] font-bold text-[#475569] hover:bg-gray-50 transition-colors shadow-sm disabled:opacity-50"
              >
                <PauseCircle size={16} />
                Suspend / Request Info
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
