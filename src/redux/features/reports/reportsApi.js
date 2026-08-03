import { apiSlice } from '../../api/apiSlice';

export const reportsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStats: builder.query({
      query: () => '/reports/dashboard',
      providesTags: ['Report'],
    }),
  }),
});

export const {
  useGetDashboardStatsQuery,
} = reportsApi;
