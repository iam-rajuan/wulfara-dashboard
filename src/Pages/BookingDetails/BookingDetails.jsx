import React, { useState } from "react";
import {
  Copy,
  Star,
  Phone,
  Mail,
  ChevronDown,
  Plus,
  Check,
} from "lucide-react";

const BookingDetails = () => {
  const [jobStatus, setJobStatus] = useState("In Progress");
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [copiedField, setCopiedField] = useState("");
  const [photos, setPhotos] = useState([
    "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1592595896551-12b371d546d5?w=400&h=300&fit=crop",
  ]);

  const jobData = {
    customer: {
      name: "Sarah Johnson",
      phone: "(555) 123-4567",
      email: "sarah.johnson@email.com",
      address: "1247 Oak Street, Springfield, IL 62701",
    },
    job: {
      type: "Lawn Mowing & Hedge Trimming",
      urgency: "Medium",
      preferredTime: "Saturday, Jan 15, 2024 - Morning (8AM-12PM)",
      budget: "$85/hour",
      description:
        "Need lawn mowing for front and back yard (approximately 0.5 acres total). Also need hedge trimming along the front fence line. Grass is currently about 4 inches high and hedges haven't been trimmed in 3 months.",
    },
    worker: {
      name: "Michael Rodriguez",
      specialty: "Gardening Specialist",
      phone: "(555) 987-6543",
      rating: 4.9,
      reviews: 127,
    },
    payment: {
      total: 170.0,
      platformFee: 20.4,
      workerPayout: 149.6,
      status: "Pending",
    },
    timeline: [
      { status: "Submitted", date: "Jan 12, 2024 at 2:30 PM", completed: true },
      {
        status: "In Progress",
        date: "Jan 13, 2024 at 9:00 AM",
        completed: true,
        pending: true,
      },
      { status: "Completed", completed: false, pending: true },
      { status: "Paid", completed: false, pending: true },
    ],
  };

  const statusOptions = [
    "Submitted",
    "In Progress",
    "Completed",
    "Paid",
    "Cancelled",
  ];

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(""), 2000);
  };

  const handleStatusChange = (newStatus) => {
    setJobStatus(newStatus);
    setShowStatusDropdown(false);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPhotos([...photos, event.target.result]);
      };
      reader.readAsDataURL(file);
    }
  };

  const getUrgencyColor = (urgency) => {
    const colors = {
      Low: "bg-green-100 text-green-700",
      Medium: "bg-orange-100 text-orange-700",
      High: "bg-red-100 text-red-700",
    };
    return colors[urgency] || "bg-gray-100 text-gray-700";
  };

  const getPaymentStatusColor = (status) => {
    const colors = {
      Pending: "bg-yellow-100 text-yellow-700",
      Completed: "bg-green-100 text-green-700",
      Failed: "bg-red-100 text-red-700",
    };
    return colors[status] || "bg-gray-100 text-gray-700";
  };

  return (
    <div className="min-h-screen p-6 mt-16 bg-gray-50">
      <div className="">
        <div className="flex flex-col gap-5 py-5">
          {/* ========================================Customer Information ========================================*/}
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <h2 className="mb-4 text-lg font-bold text-gray-900">
              Customer Information
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 text-xs text-gray-500">
                    Customer Name
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-900">
                      {jobData.customer.name}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="block mb-1 text-xs text-gray-500">
                    Phone Number
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-900">
                      {jobData.customer.phone}
                    </span>
                    <button
                      onClick={() =>
                        handleCopy(jobData.customer.phone, "phone")
                      }
                      className="text-gray-400 transition hover:text-gray-600"
                    >
                      {copiedField === "phone" ? (
                        <Check className="w-3.5 h-3.5 text-green-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 text-xs text-gray-500">
                    Email Address
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-900 truncate">
                      {jobData.customer.email}
                    </span>
                    <button
                      onClick={() =>
                        handleCopy(jobData.customer.email, "email")
                      }
                      className="flex-shrink-0 text-gray-400 transition hover:text-gray-600"
                    >
                      {copiedField === "email" ? (
                        <Check className="w-3.5 h-3.5 text-green-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block mb-1 text-xs text-gray-500">
                    Service Address
                  </label>
                  <span className="text-sm text-gray-900">
                    {jobData.customer.address}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/*======================================== Job Details ======================================== */}
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <h2 className="mb-4 text-lg font-bold text-gray-900">
              Job Details
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 text-xs text-gray-500">
                    Type of Yard Work
                  </label>
                  <span className="text-sm text-gray-900">
                    {jobData.job.type}
                  </span>
                </div>
                <div>
                  <label className="block mb-1 text-xs text-gray-500">
                    Urgency Level
                  </label>
                  <span
                    className={`px-2.5 py-1 rounded-md text-xs font-medium inline-block ${getUrgencyColor(jobData.job.urgency)}`}
                  >
                    {jobData.job.urgency}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 text-xs text-gray-500">
                    Preferred Time
                  </label>
                  <span className="text-sm text-gray-900">
                    {jobData.job.preferredTime}
                  </span>
                </div>
                <div>
                  <label className="block mb-1 text-xs text-gray-500">
                    Budget
                  </label>
                  <span className="text-sm text-gray-900">
                    {jobData.job.budget}
                  </span>
                </div>
              </div>
              <div>
                <label className="block mb-1 text-xs text-gray-500">
                  Job Description
                </label>
                <p className="text-sm text-gray-900">
                  {jobData.job.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Uploaded Photos */}
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h2 className="mb-4 text-lg font-bold text-gray-900">
                Uploaded Photos
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {photos.map((photo, index) => (
                  <div
                    key={index}
                    className="overflow-hidden bg-green-100 rounded-lg aspect-video"
                  >
                    <img
                      src={photo}
                      alt={`Photo ${index + 1}`}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ))}
                <label className="flex items-center justify-center transition bg-gray-100 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer aspect-video hover:bg-gray-200">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                  <Plus className="w-8 h-8 text-gray-400" />
                </label>
              </div>
            </div>

            {/* Job Timeline */}
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h2 className="mb-4 text-lg font-bold text-gray-900">
                Job Timeline
              </h2>
              <div className="space-y-4">
                {jobData.timeline.map((item, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-3 h-3 rounded-full ${item.completed ? "bg-gray-900" : "bg-gray-300"}`}
                      ></div>
                      {index < jobData.timeline.length - 1 && (
                        <div className="w-0.5 h-full bg-gray-300"></div>
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <h3
                        className={`text-sm ${item.completed ? "font-semibold text-gray-900" : "font-medium text-gray-400"}`}
                      >
                        {item.status}
                      </h3>
                      {item.date && (
                        <p className="text-xs text-gray-500">{item.date}</p>
                      )}
                      {item.pending && !item.date && (
                        <p className="mt-1 text-xs text-gray-400">Pending</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Worker Information */}
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h2 className="mb-4 text-lg font-bold text-gray-900">
                Worker Information
              </h2>
              <div className="flex items-start gap-4 mb-4">
                <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full">
                  {jobData.worker.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-gray-900">
                    {jobData.worker.name}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {jobData.worker.specialty}
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block mb-1 text-xs text-gray-500">
                    Contact Phone
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-900">
                      {jobData.worker.phone}
                    </span>
                    <button
                      onClick={() =>
                        handleCopy(jobData.worker.phone, "workerPhone")
                      }
                      className="text-gray-400 transition hover:text-gray-600"
                    >
                      {copiedField === "workerPhone" ? (
                        <Check className="w-3.5 h-3.5 text-green-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block mb-1 text-xs text-gray-500">
                    Rating
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${star <= Math.floor(jobData.worker.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {jobData.worker.rating}
                    </span>
                    <span className="text-xs text-gray-500">
                      ({jobData.worker.reviews} reviews)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Summary */}
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h2 className="mb-4 text-lg font-bold text-gray-900">
                Payment Summary
              </h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    Job Total Amount
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    ${jobData.payment.total.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    Platform Fee (12%)
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    ${jobData.payment.platformFee.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  <span className="text-sm text-gray-600">
                    Worker Payout (88%)
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    ${jobData.payment.workerPayout.toFixed(2)}
                  </span>
                </div>
                <div className="pt-3 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Payment Status
                    </span>
                    <span
                      className={`px-2.5 py-1 rounded-md text-xs font-medium ${getPaymentStatusColor(jobData.payment.status)}`}
                    >
                      {jobData.payment.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*======================================== Admin Actions ======================================== */}
      <div className="p-6 mt-5 bg-white rounded-lg shadow-sm">
        <h2 className="mb-4 text-lg font-bold text-gray-900">Admin Actions</h2>
        <div className="flex gap-x-5">
          <div className="relative">
            <button
              onClick={() => setShowStatusDropdown(!showStatusDropdown)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 flex items-center justify-between text-sm font-medium text-gray-900 transition"
            >
              Update Job Status: {jobStatus}
              <ChevronDown className="w-4 h-4" />
            </button>
            {showStatusDropdown && (
              <div className="absolute z-10 bg-white border border-gray-200 rounded-lg shadow-lg top-10 w-96">
                {statusOptions.map((status) => (
                  <button
                    key={status}
                    onClick={() => handleStatusChange(status)}
                    className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition ${
                      jobStatus === status ? "bg-gray-100 font-medium" : ""
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="w-96">
            <button
              onClick={() => window.open(`tel:${jobData.customer.phone}`)}
              className="w-full px-4 py-2.5 bg-[#0A3019] hover:bg-gray-800 text-white rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition"
            >
              <Phone className="w-4 h-4" />
              Call Customer
            </button>
          </div>
          <div className="w-96">
            <button
              onClick={() => window.open(`mailto:${jobData.customer.email}`)}
              className="w-full px-4 py-2.5 border border-gray-300 bg-white hover:bg-gray-50 text-gray-900 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition"
            >
              <Mail className="w-4 h-4" />
              Email Customer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
