import { apiSlice } from '../../api/apiSlice';

export const notificationsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: ({ page = 1, limit = 20 } = {}) => `/notifications?page=${page}&limit=${limit}`,
      providesTags: ['Notification'],
    }),
    markNotificationRead: builder.mutation({
      query: (id) => ({
        url: `/notifications/${id}/read`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Notification'],
    }),
    markAllNotificationsRead: builder.mutation({
      query: () => ({
        url: '/notifications/read-all',
        method: 'PATCH',
      }),
      invalidatesTags: ['Notification'],
    }),
    clearAllNotifications: builder.mutation({
      query: () => ({
        url: '/notifications/clear-all',
        method: 'DELETE',
      }),
      invalidatesTags: ['Notification'],
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useMarkNotificationReadMutation,
  useMarkAllNotificationsReadMutation,
  useClearAllNotificationsMutation,
} = notificationsApi;
