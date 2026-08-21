import { apiSlice } from '../../api/apiSlice';

export const adminRolesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdminRoles: builder.query({
      query: () => '/admin-roles',
      providesTags: ['AdminRole'],
    }),
    getAdminRoleCatalog: builder.query({
      query: () => '/admin-roles/catalog',
      providesTags: ['AdminRole'],
    }),
    createAdminRole: builder.mutation({
      query: (payload) => ({
        url: '/admin-roles',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['AdminRole'],
    }),
    updateAdminRole: builder.mutation({
      query: ({ id, ...payload }) => ({
        url: `/admin-roles/${id}`,
        method: 'PUT',
        body: payload,
      }),
      invalidatesTags: ['AdminRole'],
    }),
    deleteAdminRole: builder.mutation({
      query: (id) => ({
        url: `/admin-roles/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['AdminRole'],
    }),
    getAdminUsers: builder.query({
      query: () => '/admin-roles/admin-users',
      providesTags: ['AdminRole'],
    }),
    assignAdminRole: builder.mutation({
      query: ({ userId, adminRoleId }) => ({
        url: `/admin-roles/admin-users/${userId}`,
        method: 'PATCH',
        body: { adminRoleId },
      }),
      invalidatesTags: ['AdminRole', 'Auth'],
    }),
  }),
});

export const {
  useAssignAdminRoleMutation,
  useCreateAdminRoleMutation,
  useDeleteAdminRoleMutation,
  useGetAdminRoleCatalogQuery,
  useGetAdminRolesQuery,
  useGetAdminUsersQuery,
  useUpdateAdminRoleMutation,
} = adminRolesApi;
