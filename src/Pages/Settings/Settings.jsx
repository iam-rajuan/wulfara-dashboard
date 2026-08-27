import React, { useEffect, useMemo, useState } from 'react';
import {
  User, Building2, Shield, Bell, Plus, Download, Trash2, Save, Banknote, KeyRound, Camera,
} from 'lucide-react';
import { Input, Select, Switch, Tag, Modal, Form, message, Spin } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import BusinessProfileForm from '../../Components/CompanyProfile/BusinessProfileForm';
import ProfileCompletionCard from '../../Components/CompanyProfile/ProfileCompletionCard';
import ListingPreviewCard from '../../Components/CompanyProfile/ListingPreviewCard';
import {
  useAssignAdminRoleMutation,
  useCreateAdminRoleMutation,
  useDeleteAdminRoleMutation,
  useGetAdminRoleCatalogQuery,
  useGetAdminRolesQuery,
  useGetAdminUsersQuery,
  useUpdateAdminRoleMutation,
} from '../../redux/features/adminRoles/adminRolesApi';
import {
  useDeleteUserMutation,
  useGetUserUploadUrlMutation,
  useRequestEmailChangeOtpMutation,
  useUpdateMeMutation,
  useVerifyEmailChangeOtpMutation,
} from '../../redux/features/users/usersApi';
import { useGetSupplierDashboardQuery, useGetSupplierUploadUrlMutation, useUpdateListingMutation } from '../../redux/features/listings/listingsApi';
import {
  useClearAllNotificationsMutation,
  useGetNotificationsQuery,
  useMarkAllNotificationsReadMutation,
  useMarkNotificationReadMutation,
} from '../../redux/features/notifications/notificationsApi';
import { updateUser } from '../../redux/features/auth/authSlice';
import { hasAdminPermission } from '../../utils/adminAccess';

const MAX_AVATAR_SIZE_BYTES = 10 * 1024 * 1024;

const formatNotificationDate = (value) => {
  if (!value) {
    return 'N/A';
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return 'N/A';
  }

  return date.toLocaleString();
};

const SupplierCompanyDetails = () => {
  const { data: dashboardData, isLoading: isFetching, refetch } = useGetSupplierDashboardQuery();
  const [updateListing, { isLoading: isSaving }] = useUpdateListingMutation();
  const [getUploadUrl] = useGetSupplierUploadUrlMutation();
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);

  const [profileData, setProfileData] = useState({
    logo: null,
    companyName: '',
    description: '',
    contactEmail: '',
    contactPhone: '',
    coreProducts: [],
    moq: { value: '', unit: 'Units' },
    businessHours: {
      weekdays: { start: '08:00', end: '18:00' },
      weekends: 'Closed',
    },
    certifications: [],
    serviceAreas: [],
    shippingOptions: { fob: true, cif: true, exw: false },
    address: '',
    supplierType: 'Manufacturer',
    avgResponseTime: '~24 Hours',
    establishedYear: '',
    employeeCount: '',
    annualTurnover: '',
  });

  const [previewData, setPreviewData] = useState({
    name: 'Company Name',
    location: 'Location',
    description: 'Company description...',
    tags: [],
    logo: '',
  });

  useEffect(() => {
    if (!dashboardData?.data?.profile) {
      return;
    }

    const profile = dashboardData.data.profile;
    setProfileData((prev) => ({
      ...prev,
      companyName: profile.companyName || '',
      description: profile.description || '',
      contactEmail: profile.contactEmail || '',
      contactPhone: profile.contactPhone || '',
      logo: profile.logo && profile.logo !== 'no-logo.jpg' ? profile.logo : '',
      coreProducts: profile.coreProducts || [],
      certifications: profile.certifications || [],
      serviceAreas: profile.serviceAreas || [],
      address: profile.location?.formattedAddress || '',
      supplierType: profile.supplierType || 'Manufacturer',
      avgResponseTime: profile.avgResponseTime || '~24 Hours',
      establishedYear: profile.establishedYear || '',
      employeeCount: profile.employeeCount || '',
      annualTurnover: profile.annualTurnover || '',
      moq: profile.moq || { value: '', unit: 'Units' },
      businessHours: profile.businessHours || {
        weekdays: { start: '08:00', end: '18:00' },
        weekends: 'Closed',
      },
      shippingOptions: profile.shippingOptions || { fob: true, cif: true, exw: false },
    }));
    setPreviewData({
      name: profile.companyName || 'Company Name',
      location: profile.location?.formattedAddress || 'Location',
      description: profile.description ? `${profile.description.slice(0, 100)}...` : 'No description provided...',
      tags: profile.certifications?.slice(0, 2) || [],
      logo: profile.logo && profile.logo !== 'no-logo.jpg' ? profile.logo : '',
    });
  }, [dashboardData]);

  const completionData = {
    percentage: dashboardData?.data?.stats?.profileCompletion
      ? parseInt(dashboardData.data.stats.profileCompletion, 10)
      : 0,
    tasks: [
      { id: 1, label: 'Basic Business Info', completed: !!profileData.companyName && !!profileData.description },
      { id: 2, label: 'Upload Company Logo', completed: !!profileData.logo && profileData.logo !== 'no-logo.jpg' },
      { id: 3, label: 'Add Core Products', completed: profileData.coreProducts.length > 0 },
    ],
  };

  const handleSave = async () => {
    if (!dashboardData?.data?.profile?._id) {
      return;
    }

    try {
      await updateListing({
        id: dashboardData.data.profile._id,
        data: {
          companyName: profileData.companyName,
          description: profileData.description,
          contactEmail: profileData.contactEmail,
          contactPhone: profileData.contactPhone,
          logo: profileData.logo || 'no-logo.jpg',
          coreProducts: profileData.coreProducts,
          certifications: profileData.certifications,
          serviceAreas: profileData.serviceAreas,
          address: profileData.address,
          supplierType: profileData.supplierType,
          avgResponseTime: profileData.avgResponseTime,
          establishedYear: profileData.establishedYear,
          employeeCount: profileData.employeeCount,
          annualTurnover: profileData.annualTurnover,
          moq: profileData.moq,
          businessHours: profileData.businessHours,
          shippingOptions: profileData.shippingOptions,
        },
      }).unwrap();

      message.success('Company details updated successfully');
      refetch();
    } catch (error) {
      message.error(error?.data?.message || 'Failed to update company details');
    }
  };

  const handlePreview = () => {
    setPreviewData({
      name: profileData.companyName || 'Company Name',
      location: profileData.address || 'Location',
      description: profileData.description ? `${profileData.description.slice(0, 100)}...` : 'No description...',
      tags: profileData.certifications?.slice(0, 2) || [],
      logo: profileData.logo && profileData.logo !== 'no-logo.jpg' ? profileData.logo : '',
    });
    message.success('Preview refreshed with your latest company details');
  };

  const handleLogoUpload = async (file) => {
    try {
      setIsUploadingLogo(true);

      if (!dashboardData?.data?.profile?._id) {
        throw new Error('Supplier profile not found');
      }

      const response = await getUploadUrl({ folder: 'logos', contentType: file.type }).unwrap();
      const { uploadUrl, fileUrl } = response.data;

      await fetch(uploadUrl, {
        method: 'PUT',
        headers: { 'Content-Type': file.type },
        body: file,
      });

      await updateListing({
        id: dashboardData.data.profile._id,
        data: { logo: fileUrl },
      }).unwrap();

      setProfileData((prev) => ({ ...prev, logo: fileUrl }));
      setPreviewData((prev) => ({ ...prev, logo: fileUrl }));
      message.success('Logo uploaded successfully');
      refetch();
    } catch (error) {
      message.error(error?.data?.message || error?.message || 'Failed to upload logo');
    } finally {
      setIsUploadingLogo(false);
    }
  };

  if (isFetching && !dashboardData) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-10 flex justify-center">
        <Spin />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <BusinessProfileForm
          data={profileData}
          onChange={setProfileData}
          onLogoUpload={handleLogoUpload}
          isUploadingLogo={isUploadingLogo}
        />
        <div className="space-y-6">
          <ProfileCompletionCard completionData={completionData} />
          <ListingPreviewCard previewData={previewData} />
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={handlePreview}
          className="px-4 py-2.5 rounded-lg border border-gray-200 text-[13px] font-bold text-gray-700 hover:bg-gray-50"
        >
          Refresh Preview
        </button>
        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-6 py-2.5 bg-[#dcb14b] hover:bg-[#c99f3b] text-gray-900 font-bold rounded-lg transition-colors shadow-sm disabled:opacity-60"
        >
          <Save size={16} />
          {isSaving ? 'Saving...' : 'Save Company Details'}
        </button>
      </div>
    </div>
  );
};

const AdminGeneralConfiguration = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-100">
          <h2 className="text-[20px] font-black text-gray-900">Company Details</h2>
          <p className="text-sm text-gray-500 mt-1">Administrative workspace information for this portal.</p>
        </div>

        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-[12px] font-bold tracking-[0.12em] text-gray-400 uppercase mb-2">
              Workspace Role
            </label>
            <div className="h-12 rounded-xl border border-gray-200 px-4 flex items-center text-sm font-semibold text-gray-800 bg-gray-50">
              {user?.role || 'Admin'}
            </div>
          </div>

          <div>
            <label className="block text-[12px] font-bold tracking-[0.12em] text-gray-400 uppercase mb-2">
              Access Scope
            </label>
            <div className="h-12 rounded-xl border border-gray-200 px-4 flex items-center text-sm font-semibold text-gray-800 bg-gray-50">
              Platform Administration
            </div>
          </div>

          <div>
            <label className="block text-[12px] font-bold tracking-[0.12em] text-gray-400 uppercase mb-2">
              Account Email
            </label>
            <div className="h-12 rounded-xl border border-gray-200 px-4 flex items-center text-sm font-semibold text-gray-800 bg-gray-50">
              {user?.email || 'Not available'}
            </div>
          </div>

          <div>
            <label className="block text-[12px] font-bold tracking-[0.12em] text-gray-400 uppercase mb-2">
              System Status
            </label>
            <div className="h-12 rounded-xl border border-emerald-100 px-4 flex items-center text-sm font-semibold text-emerald-700 bg-emerald-50">
              Active
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
        <h3 className="text-lg font-black text-gray-900 mb-2">Admin Note</h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          Supplier listing data is managed from the supplier profile and supplier verification views. This page now
          remains functional for admins without altering the existing settings navigation flow.
        </p>
      </div>
    </div>
  );
};

const UserProfile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [updateMe, { isLoading }] = useUpdateMeMutation();
  const [getUserUploadUrl] = useGetUserUploadUrlMutation();
  const [requestEmailChangeOtp, { isLoading: isRequestingEmailOtp }] = useRequestEmailChangeOtpMutation();
  const [verifyEmailChangeOtp, { isLoading: isVerifyingEmailOtp }] = useVerifyEmailChangeOtpMutation();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar || '');
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [pendingEmail, setPendingEmail] = useState('');
  const [emailOtp, setEmailOtp] = useState('');
  const [otpSentTo, setOtpSentTo] = useState('');

  useEffect(() => {
    setName(user?.name || '');
    setEmail(user?.email || '');
    setAvatarUrl(user?.avatar || '');
  }, [user]);

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const resetInput = () => {
      e.target.value = '';
    };

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      message.error('Please upload a JPG, PNG, or WebP image');
      resetInput();
      return;
    }

    if (file.size > MAX_AVATAR_SIZE_BYTES) {
      message.error('Avatar size must be less than 10MB');
      resetInput();
      return;
    }

    setAvatarLoading(true);
    try {
      const presignResponse = await getUserUploadUrl(file.type).unwrap();
      if (!presignResponse.success || !presignResponse.data) {
        throw new Error('Failed to get upload URL');
      }

      const { uploadUrl, fileUrl } = presignResponse.data;

      await axios.put(uploadUrl, file, {
        headers: {
          'Content-Type': file.type
        }
      });

      const updateResponse = await updateMe({ avatar: fileUrl }).unwrap();
      if (!updateResponse?.success) {
        throw new Error(updateResponse?.message || 'Failed to save avatar');
      }

      setAvatarUrl(fileUrl);
      setName(updateResponse.data?.name || name);
      setEmail(updateResponse.data?.email || email);
      dispatch(updateUser(updateResponse.data));
      message.success('Profile photo uploaded successfully!');
    } catch (err) {
      console.error(err);
      message.error('Failed to upload avatar. Please try again.');
    } finally {
      setAvatarLoading(false);
      resetInput();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      message.error('Name is required');
      return;
    }
    try {
      const response = await updateMe({ name, avatar: avatarUrl }).unwrap();
      if (response.success) {
        dispatch(updateUser(response.data));
        setEmail(response.data?.email || email);
        message.success('Profile updated successfully!');
      } else {
        message.error(response.message || 'Failed to update profile');
      }
    } catch (err) {
      message.error(err.data?.message || 'An error occurred while updating profile');
    }
  };

  const resetEmailChangeState = () => {
    setPendingEmail('');
    setEmailOtp('');
    setOtpSentTo('');
    setIsEmailModalOpen(false);
  };

  const handleRequestEmailOtp = async () => {
    const normalizedEmail = pendingEmail.trim().toLowerCase();

    if (!normalizedEmail) {
      message.error('Please enter the new email address');
      return;
    }

    try {
      const response = await requestEmailChangeOtp({ email: normalizedEmail }).unwrap();
      setOtpSentTo(response?.data?.email || normalizedEmail);
      message.success(response?.message || 'Verification code sent');
    } catch (err) {
      message.error(err?.data?.message || 'Failed to send verification code');
    }
  };

  const handleVerifyEmailOtp = async () => {
    if (!emailOtp.trim()) {
      message.error('Please enter the OTP code');
      return;
    }

    try {
      const response = await verifyEmailChangeOtp({ otp: emailOtp.trim() }).unwrap();
      if (response?.success) {
        setEmail(response.data?.email || email);
        dispatch(updateUser(response.data));
        message.success(response?.message || 'Email address updated successfully');
        resetEmailChangeState();
      }
    } catch (err) {
      message.error(err?.data?.message || 'Failed to verify email change');
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-8 py-6 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-900">My Profile</h2>
        <p className="text-[13px] text-gray-500 mt-1">Your account and profile details.</p>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center gap-5">
          <input
            type="file"
            id="avatar-input"
            className="hidden"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleAvatarChange}
          />
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <label
              htmlFor="avatar-input"
              className="w-20 h-20 rounded-2xl bg-gray-100 border border-gray-200 flex items-center justify-center text-2xl font-black shadow-sm relative group overflow-hidden cursor-pointer shrink-0"
            >
              {avatarLoading ? (
                <Spin size="small" />
              ) : avatarUrl ? (
                <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-[#D4AF37] text-white">
                  {(name || 'US')
                    .split(' ')
                    .slice(0, 2)
                    .map((part) => part[0] || '')
                    .join('')
                    .toUpperCase()}
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera size={16} className="text-white mb-1" />
                <span className="text-[9px] text-white font-bold uppercase tracking-wider">Upload</span>
              </div>
            </label>
            <label
              htmlFor="avatar-input"
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-[13px] font-bold text-gray-700 bg-white ${avatarLoading ? 'cursor-wait opacity-60' : 'cursor-pointer hover:bg-gray-50'}`}
            >
              <Camera size={16} />
              {avatarLoading ? 'Uploading...' : 'Change Photo'}
            </label>
          </div>
          <div>
            <h3 className="text-2xl font-black text-gray-900">{name || 'User'}</h3>
            <p className="text-[14px] text-gray-500 mt-1">{email || 'No email found'}</p>
            <div className="flex flex-wrap items-center gap-2 mt-3">
              <Tag className="m-0 bg-blue-50 text-blue-700 border-blue-100 font-semibold uppercase">
                {user?.role || 'User'}
              </Tag>
              <Tag className="m-0 bg-emerald-50 text-emerald-700 border-emerald-100 font-semibold">
                {user?.status || 'Active'}
              </Tag>
              {user?.isVerified && (
                <Tag className="m-0 bg-amber-50 text-amber-700 border-amber-100 font-semibold">
                  Verified
                </Tag>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Full Name</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="px-4 py-2.5 rounded-md border-gray-200 text-sm font-medium focus:border-[#dcb14b] focus:ring-1 focus:ring-[#dcb14b]"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Email Address</label>
            <div className="space-y-2">
              <Input
                value={email}
                type="email"
                readOnly
                className="px-4 py-2.5 rounded-md border-gray-200 text-sm font-medium bg-gray-50 text-gray-500 cursor-not-allowed"
              />
              <button
                type="button"
                onClick={() => setIsEmailModalOpen(true)}
                className="text-[12px] font-bold text-[#2563EB] hover:text-[#1D4ED8]"
              >
                Change email with OTP verification
              </button>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Access Level / Role</label>
            <Input
              value={user?.role === 'admin' ? (user?.adminRole?.name || 'Admin') : 'Supplier'}
              disabled
              className="px-4 py-2.5 rounded-md border-gray-200 text-sm font-medium bg-gray-50 text-gray-500 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Account State</label>
            <Input
              value={user?.status || 'Active'}
              disabled
              className="px-4 py-2.5 rounded-md border-gray-200 text-sm font-medium bg-gray-50 text-gray-500 cursor-not-allowed"
            />
          </div>
        </div>

        <div className="border border-gray-100 rounded-xl p-6 bg-[#FAFAFA]">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-600 shrink-0">
              <KeyRound size={18} />
            </div>
            <div>
              <h4 className="text-[15px] font-bold text-gray-900">Password & Security</h4>
              <p className="text-[13px] text-gray-500 mt-1">
                Use the dashboard sign-in screen “Forgot password?” flow if you need to reset your password.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-gray-100">
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#dcb14b] hover:bg-[#c99f3b] text-gray-900 font-bold rounded-lg transition-colors shadow-sm disabled:opacity-60 cursor-pointer"
          >
            <Save size={16} />
            {isLoading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>

      <Modal
        title="Change Email Address"
        open={isEmailModalOpen}
        onCancel={resetEmailChangeState}
        footer={null}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-[12px] font-bold text-gray-500 uppercase tracking-widest mb-2">
              New Email Address
            </label>
            <Input
              value={pendingEmail}
              type="email"
              onChange={(e) => setPendingEmail(e.target.value)}
              placeholder="name@example.com"
              className="px-4 py-2.5 rounded-md border-gray-200 text-sm font-medium"
            />
          </div>

          <button
            type="button"
            onClick={handleRequestEmailOtp}
            disabled={isRequestingEmailOtp}
            className="w-full px-4 py-2.5 rounded-lg bg-[#dcb14b] hover:bg-[#c99f3b] text-gray-900 font-bold disabled:opacity-60"
          >
            {isRequestingEmailOtp ? 'Sending OTP...' : 'Send OTP'}
          </button>

          {otpSentTo && (
            <>
              <div className="rounded-lg border border-emerald-100 bg-emerald-50 px-4 py-3 text-[13px] text-emerald-700">
                OTP sent to {otpSentTo}. Enter the code below to confirm the change.
              </div>

              <div>
                <label className="block text-[12px] font-bold text-gray-500 uppercase tracking-widest mb-2">
                  Verification Code
                </label>
                <Input
                  value={emailOtp}
                  onChange={(e) => setEmailOtp(e.target.value)}
                  placeholder="6-digit OTP"
                  maxLength={6}
                  className="px-4 py-2.5 rounded-md border-gray-200 text-sm font-medium"
                />
              </div>

              <button
                type="button"
                onClick={handleVerifyEmailOtp}
                disabled={isVerifyingEmailOtp}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-gray-800 font-bold hover:bg-gray-50 disabled:opacity-60"
              >
                {isVerifyingEmailOtp ? 'Verifying...' : 'Verify and Update Email'}
              </button>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
};

const RoleEditorModal = ({ open, onCancel, onSubmit, catalog, isSubmitting }) => {
  const [form] = Form.useForm();

  return (
    <Modal
      title="Create Custom Role"
      open={open}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      onOk={() => form.submit()}
      okText={isSubmitting ? 'Creating...' : 'Create Role'}
      confirmLoading={isSubmitting}
    >
      <Form form={form} layout="vertical" onFinish={onSubmit}>
        <Form.Item
          name="name"
          label="Role Name"
          rules={[{ required: true, message: 'Please provide a role name' }]}
        >
          <Input placeholder="Regional Operations Admin" />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea rows={3} placeholder="Briefly describe what this role can do." />
        </Form.Item>
        <Form.Item
          name="permissions"
          label="Permissions"
          rules={[{ required: true, message: 'Select at least one permission' }]}
        >
          <Select
            mode="multiple"
            optionFilterProp="label"
            placeholder="Select permissions"
            options={catalog.flatMap((group) =>
              group.permissions.map((permission) => ({
                value: permission.key,
                label: `${group.label} - ${permission.label}`,
              }))
            )}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const RolesAndPermissions = () => {
  const { user } = useSelector((state) => state.auth);
  const canManageRoles = hasAdminPermission(user, 'roles.manage');
  const { data: rolesResponse, isLoading: rolesLoading } = useGetAdminRolesQuery(undefined, {
    skip: !canManageRoles,
  });
  const { data: catalogResponse, isLoading: catalogLoading } = useGetAdminRoleCatalogQuery(undefined, {
    skip: !canManageRoles,
  });
  const { data: adminUsersResponse, isLoading: adminUsersLoading } = useGetAdminUsersQuery(undefined, {
    skip: !canManageRoles,
  });
  const [createRole, { isLoading: isCreatingRole }] = useCreateAdminRoleMutation();
  const [updateRole, { isLoading: isUpdatingRole }] = useUpdateAdminRoleMutation();
  const [deleteRole, { isLoading: isDeletingRole }] = useDeleteAdminRoleMutation();
  const [assignRole, { isLoading: isAssigningRole }] = useAssignAdminRoleMutation();
  const [deleteUser, { isLoading: isDeletingAdminUser }] = useDeleteUserMutation();

  const roles = useMemo(() => rolesResponse?.data || [], [rolesResponse?.data]);
  const catalog = useMemo(() => catalogResponse?.data || [], [catalogResponse?.data]);
  const adminUsers = useMemo(() => adminUsersResponse?.data || [], [adminUsersResponse?.data]);
  const [selectedRoleId, setSelectedRoleId] = useState(null);
  const [localPermissions, setLocalPermissions] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    if (!selectedRoleId && roles.length > 0) {
      setSelectedRoleId(roles[0]._id);
    }
  }, [roles, selectedRoleId]);

  const selectedRole = useMemo(
    () => roles.find((role) => role._id === selectedRoleId) || roles[0] || null,
    [roles, selectedRoleId]
  );

  useEffect(() => {
    setLocalPermissions(selectedRole?.permissions || []);
  }, [selectedRole]);

  const handleTogglePermission = (permissionKey) => {
    if (!selectedRole || selectedRole.slug === 'super-admin') {
      return;
    }

    setLocalPermissions((prev) =>
      prev.includes(permissionKey)
        ? prev.filter((item) => item !== permissionKey)
        : [...prev, permissionKey]
    );
  };

  const handleSavePermissions = async () => {
    if (!selectedRole) {
      return;
    }

    try {
      await updateRole({
        id: selectedRole._id,
        permissions: localPermissions,
      }).unwrap();
      message.success(`Updated permissions for ${selectedRole.name}`);
    } catch (error) {
      message.error(error?.data?.message || 'Failed to update role permissions');
    }
  };

  const handleCreateRole = async (values) => {
    try {
      const createdRole = await createRole(values).unwrap();
      setSelectedRoleId(createdRole.data._id);
      setIsCreateModalOpen(false);
      message.success('Custom role created');
    } catch (error) {
      message.error(error?.data?.message || 'Failed to create custom role');
    }
  };

  const handleDeleteRole = async () => {
    if (!selectedRole || selectedRole.isSystem) {
      return;
    }

    try {
      await deleteRole(selectedRole._id).unwrap();
      setSelectedRoleId(null);
      message.success('Custom role deleted');
    } catch (error) {
      message.error(error?.data?.message || 'Failed to delete role');
    }
  };

  const handleAssignRole = async (userId, adminRoleId) => {
    try {
      await assignRole({ userId, adminRoleId }).unwrap();
      message.success('Admin role updated');
    } catch (error) {
      message.error(error?.data?.message || 'Failed to assign role');
    }
  };

  const handleDeleteAdminUser = async (adminUser) => {
    const confirmed = window.confirm(`Delete admin account for ${adminUser.email}?`);
    if (!confirmed) {
      return;
    }

    try {
      await deleteUser(adminUser._id).unwrap();
      message.success('Admin account deleted');
    } catch (error) {
      message.error(error?.data?.message || 'Failed to delete admin account');
    }
  };

  const handleExportCsv = () => {
    if (!selectedRole) {
      return;
    }

    const lines = [
      'permission_group,permission_key,permission_label,enabled',
      ...catalog.flatMap((group) =>
        group.permissions.map((permission) =>
          [
            group.label,
            permission.key,
            permission.label,
            localPermissions.includes(permission.key) ? 'yes' : 'no',
          ].join(',')
        )
      ),
    ];

    const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${selectedRole.slug || 'admin-role'}-permissions.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  if (!canManageRoles) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Roles & Permissions</h2>
        <p className="text-sm text-gray-500">You do not have permission to manage admin roles.</p>
      </div>
    );
  }

  if (rolesLoading || catalogLoading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-10 flex justify-center">
        <Spin />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <h2 className="text-2xl font-black text-gray-900 mb-2">Roles & Permissions</h2>
          <p className="text-sm text-gray-500 font-medium">Manage real admin roles, permission grants, and role assignments.</p>
        </div>
        <div className="flex items-center gap-3">
          {selectedRole && !selectedRole.isSystem && (
            <button
              type="button"
              onClick={handleDeleteRole}
              disabled={isDeletingRole}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-[13px] font-bold border border-red-200 text-red-600 hover:bg-red-50 disabled:opacity-60"
            >
              <Trash2 size={16} /> Delete Role
            </button>
          )}
          <button
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 bg-[#0E1726] text-white px-4 py-2.5 rounded-lg text-[13px] font-bold hover:bg-gray-800 transition-colors shadow-sm"
          >
            <Plus size={16} /> Create Custom Role
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {roles.map((role) => {
          const isSelected = selectedRole?._id === role._id;
          const icon = role.slug === 'finance-admin'
            ? <Banknote size={16} />
            : role.slug === 'support-admin'
              ? <Bell size={16} />
              : role.slug === 'admin'
                ? <User size={16} />
                : <Shield size={16} />;

          return (
            <button
              type="button"
              key={role._id}
              onClick={() => setSelectedRoleId(role._id)}
              className={`text-left p-5 rounded-xl border relative transition-all ${isSelected ? 'border-blue-200 bg-blue-50/30' : 'border-gray-200 bg-white hover:border-gray-300'}`}
            >
              {isSelected && (
                <div className="absolute top-[-1px] left-8 right-8 h-1 bg-blue-500 rounded-b-md"></div>
              )}
              <div className="flex justify-between items-start mb-4">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${role.slug === 'super-admin' ? 'bg-[#dcb14b] text-white' : 'bg-gray-100 text-gray-500'}`}>
                  {icon}
                </div>
                <div className="flex gap-2">
                  {role.isSystem && (
                    <Tag color="blue" className="font-bold border-0 bg-blue-100 text-blue-600 m-0 text-[10px] tracking-wider">
                      SYSTEM
                    </Tag>
                  )}
                  {role.isDefault && (
                    <Tag color="gold" className="font-bold border-0 bg-amber-100 text-amber-700 m-0 text-[10px] tracking-wider">
                      DEFAULT
                    </Tag>
                  )}
                </div>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{role.name}</h3>
              <p className="text-[11px] text-gray-500 leading-relaxed mb-6 min-h-[40px]">{role.description}</p>
              <p className="text-[11px] font-bold text-blue-600">{role.usersCount} Admins</p>
            </button>
          );
        })}
      </div>

      {selectedRole && (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="p-5 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-b border-gray-100">
            <div>
              <h3 className="text-lg font-bold text-gray-900">{selectedRole.name} Permission Matrix</h3>
              <p className="text-[12px] text-gray-500 mt-1">{selectedRole.description}</p>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleExportCsv}
                className="px-4 py-2 text-[13px] font-bold text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-2"
              >
                <Download size={14} />
                Export CSV
              </button>
              <button
                type="button"
                onClick={handleSavePermissions}
                disabled={selectedRole.slug === 'super-admin' || isUpdatingRole}
                className="px-4 py-2 text-[13px] font-bold text-white bg-[#0E1726] rounded-lg hover:bg-gray-800 disabled:opacity-60 flex items-center gap-2"
              >
                <Save size={14} />
                Save Changes
              </button>
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {catalog.map((group) => (
              <div key={group.key}>
                <div className="px-6 py-3 bg-gray-50/80 text-[11px] font-bold text-gray-900">{group.label}</div>
                {group.permissions.map((permission) => (
                  <div key={permission.key} className="px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div>
                      <div className="text-[13px] font-semibold text-gray-800">{permission.label}</div>
                      <div className="text-[11px] text-gray-500 mt-1">{permission.description}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Tag className="m-0 text-[10px] font-bold bg-gray-100 text-gray-600 border-gray-200">
                        {permission.key}
                      </Tag>
                      <Switch
                        checked={selectedRole.slug === 'super-admin' || localPermissions.includes(permission.key)}
                        onChange={() => handleTogglePermission(permission.key)}
                        disabled={selectedRole.slug === 'super-admin'}
                        className="bg-gray-200 [&.ant-switch-checked]:bg-[#dcb14b]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-900">Admin Role Assignments</h3>
          <p className="text-[12px] text-gray-500 mt-1">Assign a saved admin role to each internal admin account.</p>
        </div>
        {adminUsersLoading ? (
          <div className="p-8 flex justify-center"><Spin /></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50/50">
                <tr>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Admin</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Email</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Current Role</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Assign Role</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {adminUsers.map((adminUser) => (
                  <tr key={adminUser._id}>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900">{adminUser.name}</div>
                      <div className="text-[11px] text-gray-500 mt-1">
                        {adminUser.isSuperAdmin ? 'Super admin access' : `${adminUser.permissions?.length || 0} permissions`}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{adminUser.email}</td>
                    <td className="px-6 py-4">
                      <Tag className="m-0 bg-blue-50 text-blue-700 border-blue-100 font-semibold">
                        {adminUser.adminRole?.name || 'Unassigned'}
                      </Tag>
                    </td>
                    <td className="px-6 py-4 min-w-[240px]">
                      <Select
                        value={adminUser.adminRole?._id}
                        onChange={(value) => handleAssignRole(adminUser._id, value)}
                        loading={isAssigningRole}
                        disabled={adminUser.isProtectedSuperAdmin}
                        className="w-full"
                        options={roles
                          .filter((role) =>
                            adminUser.isProtectedSuperAdmin ? role.slug === 'super-admin' : role.slug !== 'super-admin'
                          )
                          .map((role) => ({
                            value: role._id,
                            label: role.name,
                          }))}
                      />
                      {adminUser.isProtectedSuperAdmin && (
                        <p className="text-[11px] text-amber-600 mt-2 font-medium">
                          Locked seeded Super Admin
                        </p>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {!adminUser.isProtectedSuperAdmin && adminUser._id !== user?._id ? (
                        <button
                          type="button"
                          onClick={() => handleDeleteAdminUser(adminUser)}
                          disabled={isDeletingAdminUser}
                          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-red-200 text-red-600 text-[12px] font-bold hover:bg-red-50 disabled:opacity-60"
                        >
                          <Trash2 size={14} />
                          Delete
                        </button>
                      ) : (
                        <span className="text-[11px] font-medium text-gray-400">
                          {adminUser._id === user?._id ? 'Current account' : 'Protected'}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <RoleEditorModal
        open={isCreateModalOpen}
        onCancel={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateRole}
        catalog={catalog}
        isSubmitting={isCreatingRole}
      />
    </div>
  );
};

const NotificationsSettings = () => {
  const {
    data: notificationsResponse,
    isLoading,
    refetch,
  } = useGetNotificationsQuery({ page: 1, limit: 50 }, {
    refetchOnMountOrArgChange: true,
  });
  const [markNotificationRead, { isLoading: isMarkingRead }] = useMarkNotificationReadMutation();
  const [markAllNotificationsRead, { isLoading: isMarkingAllRead }] = useMarkAllNotificationsReadMutation();
  const [clearAllNotifications, { isLoading: isClearingAll }] = useClearAllNotificationsMutation();

  const notifications = notificationsResponse?.data || [];
  const unreadCount = notifications.filter((notification) => !notification.isRead).length;

  const handleMarkRead = async (id) => {
    try {
      await markNotificationRead(id).unwrap();
      message.success('Notification marked as read');
    } catch (error) {
      message.error(error?.data?.message || 'Failed to mark notification as read');
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await markAllNotificationsRead().unwrap();
      message.success('All notifications marked as read');
    } catch (error) {
      message.error(error?.data?.message || 'Failed to mark all notifications as read');
    }
  };

  const handleClearAll = async () => {
    try {
      await clearAllNotifications().unwrap();
      message.success('All notifications cleared');
    } catch (error) {
      message.error(error?.data?.message || 'Failed to clear notifications');
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">Notifications</h2>
          <p className="text-[13px] text-gray-500 font-medium">
            Review your live in-app notifications and manage read state from one place.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Tag className="m-0 bg-blue-50 text-blue-700 border-blue-100 font-semibold">
            {unreadCount} unread
          </Tag>
          <button
            type="button"
            onClick={() => refetch()}
            className="px-4 py-2 text-[13px] font-bold text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            Refresh
          </button>
          <button
            type="button"
            onClick={handleMarkAllRead}
            disabled={isMarkingAllRead || unreadCount === 0}
            className="px-4 py-2 text-[13px] font-bold text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-60"
          >
            Mark All Read
          </button>
          <button
            type="button"
            onClick={handleClearAll}
            disabled={isClearingAll || notifications.length === 0}
            className="px-4 py-2 text-[13px] font-bold text-red-600 border border-red-200 rounded-lg hover:bg-red-50 disabled:opacity-60"
          >
            Clear All
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="p-10 flex justify-center">
          <Spin />
        </div>
      ) : notifications.length === 0 ? (
        <div className="p-10 text-center text-sm text-gray-500">
          No notifications yet.
        </div>
      ) : (
        <div className="divide-y divide-gray-100">
          {notifications.map((notification) => (
            <div
              key={notification._id}
              className={`p-6 flex flex-col md:flex-row md:items-start md:justify-between gap-4 ${notification.isRead ? 'bg-white' : 'bg-blue-50/30'}`}
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-[14px] font-bold text-gray-900">{notification.title}</h3>
                  {!notification.isRead && (
                    <Tag className="m-0 bg-amber-50 text-amber-700 border-amber-100 font-semibold">
                      New
                    </Tag>
                  )}
                </div>
                <p className="text-[13px] text-gray-600 leading-relaxed">{notification.message}</p>
                <p className="text-[11px] text-gray-400 mt-2">{formatNotificationDate(notification.createdAt)}</p>
              </div>
              <div className="flex items-center gap-3">
                <Tag className={`m-0 font-semibold ${notification.isRead ? 'bg-gray-100 text-gray-600 border-gray-200' : 'bg-emerald-50 text-emerald-700 border-emerald-100'}`}>
                  {notification.isRead ? 'Read' : 'Unread'}
                </Tag>
                {!notification.isRead && (
                  <button
                    type="button"
                    onClick={() => handleMarkRead(notification._id)}
                    disabled={isMarkingRead}
                    className="px-4 py-2 text-[13px] font-bold text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-60"
                  >
                    Mark Read
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Settings = () => {
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const isAdmin = user?.role === 'admin';

  const getActiveTab = () => {
    if (location.pathname === '/settings/roles') return 'Roles & Permissions';
    if (location.pathname === '/settings/notifications') return 'Notifications';
    if (location.pathname === '/settings/company') return 'Company Details';
    return 'My Profile';
  };

  const activeTab = getActiveTab();

  const tabs = isAdmin
    ? [
        hasAdminPermission(user, 'settings.manage') && { id: 'My Profile', path: '/settings', icon: <User size={16} /> },
        hasAdminPermission(user, 'settings.manage') && { id: 'Company Details', path: '/settings/company', icon: <Building2 size={16} /> },
        hasAdminPermission(user, 'roles.manage') && { id: 'Roles & Permissions', path: '/settings/roles', icon: <Shield size={16} /> },
        hasAdminPermission(user, 'notifications.manage') && { id: 'Notifications', path: '/settings/notifications', icon: <Bell size={16} /> },
      ].filter(Boolean)
    : [
        { id: 'My Profile', path: '/settings', icon: <User size={16} /> },
        { id: 'Company Details', path: '/settings/company', icon: <Building2 size={16} /> },
        { id: 'Notifications', path: '/settings/notifications', icon: <Bell size={16} /> },
      ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-12 md:pt-16 pb-20">
      <div className="max-w-[1200px] mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-[240px] shrink-0">
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <h2 className="text-xl font-black text-gray-900 px-4 mb-4">Settings</h2>
              <nav className="flex flex-col space-y-1">
                {tabs.map((tab) => (
                  <Link
                    key={tab.id}
                    to={tab.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all ${activeTab === tab.id ? 'bg-[#dcb14b] text-gray-900' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
                  >
                    {tab.icon}
                    {tab.id}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          <div className="flex-1">
            {activeTab === 'My Profile' && <UserProfile />}
            {activeTab === 'Company Details' && (isAdmin ? <AdminGeneralConfiguration /> : <SupplierCompanyDetails />)}
            {activeTab === 'Roles & Permissions' && <RolesAndPermissions />}
            {activeTab === 'Notifications' && <NotificationsSettings />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
