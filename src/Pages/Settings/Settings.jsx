import React, { useEffect, useMemo, useState } from 'react';
import {
  User, Building2, Shield, Bell, Plus, Download, Trash2, Save, Banknote, Mail, BadgeCheck, KeyRound,
} from 'lucide-react';
import { Input, Select, Switch, Checkbox, Tag, Modal, Form, message, Spin } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  useAssignAdminRoleMutation,
  useCreateAdminRoleMutation,
  useDeleteAdminRoleMutation,
  useGetAdminRoleCatalogQuery,
  useGetAdminRolesQuery,
  useGetAdminUsersQuery,
  useUpdateAdminRoleMutation,
} from '../../redux/features/adminRoles/adminRolesApi';
import { useDeleteUserMutation } from '../../redux/features/users/usersApi';
import { hasAdminPermission } from '../../utils/adminAccess';

const SupplierGeneralConfiguration = () => (
  <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
    <div className="px-8 py-6 border-b border-gray-100">
      <h2 className="text-xl font-bold text-gray-900">General Configuration</h2>
    </div>

    <div className="p-8 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Platform Name</label>
          <Input defaultValue="WULFARA B2B Marketplace" className="px-4 py-2.5 rounded-md border-gray-200 text-sm font-medium" />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Primary URL</label>
          <Input defaultValue="https://app.wulfara.com" className="px-4 py-2.5 rounded-md border-gray-200 text-sm font-medium" />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Support Email Address</label>
          <Input defaultValue="support@wulfara.com" className="px-4 py-2.5 rounded-md border-gray-200 text-sm font-medium" />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Default Language</label>
          <Select
            defaultValue="English (US)"
            className="w-full h-[42px]"
            options={[{ value: 'English (US)', label: 'English (US)' }]}
          />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-gray-900 mb-4">Platform Access Controls</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg bg-gray-50/50">
            <div>
              <h4 className="text-[13px] font-bold text-gray-900">Enable Public Browsing</h4>
              <p className="text-[12px] text-gray-500">Allow non-authenticated users to view the supplier directory.</p>
            </div>
            <Switch defaultChecked className="bg-gray-200 [&.ant-switch-checked]:bg-[#dcb14b]" />
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg bg-gray-50/50">
            <div>
              <h4 className="text-[13px] font-bold text-gray-900">Allow Guest RFQ Submission</h4>
              <p className="text-[12px] text-gray-500">Guests can submit Request for Quotes without an account.</p>
            </div>
            <Switch className="bg-gray-200 [&.ant-switch-checked]:bg-[#dcb14b]" />
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg bg-gray-50/50">
            <div>
              <h4 className="text-[13px] font-bold text-gray-900">Open Supplier Registration</h4>
              <p className="text-[12px] text-gray-500">Suppliers can sign up autonomously via the platform.</p>
            </div>
            <Switch defaultChecked className="bg-gray-200 [&.ant-switch-checked]:bg-[#dcb14b]" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

const AdminProfile = ({ user }) => (
  <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
    <div className="px-8 py-6 border-b border-gray-100">
      <h2 className="text-xl font-bold text-gray-900">Admin Profile</h2>
      <p className="text-[13px] text-gray-500 mt-1">Your internal admin account information.</p>
    </div>

    <div className="p-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center gap-5">
        <div className="w-20 h-20 rounded-2xl bg-[#D4AF37] text-[#0F172A] flex items-center justify-center text-2xl font-black shadow-sm">
          {(user?.name || 'AD')
            .split(' ')
            .slice(0, 2)
            .map((part) => part[0] || '')
            .join('')
            .toUpperCase()}
        </div>
        <div>
          <h3 className="text-2xl font-black text-gray-900">{user?.name || 'Admin User'}</h3>
          <p className="text-[14px] text-gray-500 mt-1">{user?.email || 'No email found'}</p>
          <div className="flex flex-wrap items-center gap-2 mt-3">
            <Tag className="m-0 bg-blue-50 text-blue-700 border-blue-100 font-semibold">
              {user?.adminRole?.name || 'Admin'}
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
        <div className="border border-gray-100 rounded-xl p-5 bg-gray-50/50">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-600">
              <User size={18} />
            </div>
            <div>
              <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Full Name</p>
              <p className="text-[15px] font-semibold text-gray-900 mt-1">{user?.name || 'N/A'}</p>
            </div>
          </div>
        </div>

        <div className="border border-gray-100 rounded-xl p-5 bg-gray-50/50">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-600">
              <Mail size={18} />
            </div>
            <div>
              <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Email Address</p>
              <p className="text-[15px] font-semibold text-gray-900 mt-1 break-all">{user?.email || 'N/A'}</p>
            </div>
          </div>
        </div>

        <div className="border border-gray-100 rounded-xl p-5 bg-gray-50/50">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-600">
              <Shield size={18} />
            </div>
            <div>
              <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Access Level</p>
              <p className="text-[15px] font-semibold text-gray-900 mt-1">{user?.adminRole?.name || 'Admin'}</p>
            </div>
          </div>
        </div>

        <div className="border border-gray-100 rounded-xl p-5 bg-gray-50/50">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-600">
              <BadgeCheck size={18} />
            </div>
            <div>
              <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Account State</p>
              <p className="text-[15px] font-semibold text-gray-900 mt-1">{user?.status || 'Active'}</p>
            </div>
          </div>
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
              Use the dashboard sign-in screen “Forgot password?” flow if you need to reset this admin account password.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

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

const NotificationsSettings = () => (
  <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
    <div className="p-6 border-b border-gray-100">
      <h2 className="text-xl font-bold text-gray-900 mb-1">Notifications Settings</h2>
      <p className="text-[13px] text-gray-500 font-medium">Configure how and when your team is alerted for platform events.</p>
    </div>

    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="bg-[#fcfcfc] border-b border-gray-100">
          <tr>
            <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest w-[40%]">Event Category / Type</th>
            <th className="px-4 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest text-center">In-App</th>
            <th className="px-4 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest text-center">Email</th>
            <th className="px-4 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest text-center">Critical Alert</th>
            <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Recipients</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white"><td colSpan={5} className="px-6 py-4 text-[12px] font-bold text-gray-900 border-b border-gray-50">Supplier Management</td></tr>
          <tr className="border-b border-gray-50">
            <td className="px-6 py-4">
              <div className="font-bold text-[13px] text-gray-800">New Supplier Signup</div>
              <div className="text-[11px] text-gray-500 mt-1">When a new supplier registers on the platform.</div>
            </td>
            <td className="px-4 py-4 text-center"><Checkbox defaultChecked /></td>
            <td className="px-4 py-4 text-center"><Checkbox /></td>
            <td className="px-4 py-4 text-center"><Checkbox /></td>
            <td className="px-6 py-4"><Tag className="text-[10px] font-bold bg-gray-100 text-gray-600 border-gray-200">Procurement Team</Tag></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

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
            {activeTab === 'My Profile' && (isAdmin ? <AdminProfile user={user} /> : <SupplierGeneralConfiguration />)}
            {activeTab === 'Company Details' && <SupplierGeneralConfiguration />}
            {activeTab === 'Roles & Permissions' && <RolesAndPermissions />}
            {activeTab === 'Notifications' && <NotificationsSettings />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
