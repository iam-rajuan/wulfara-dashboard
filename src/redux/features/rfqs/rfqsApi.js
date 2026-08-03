import { apiSlice } from '../../api/apiSlice';

export const rfqsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRfqs: builder.query({
      query: () => '/rfqs',
      providesTags: ['Rfq'],
    }),
    getRfqStats: builder.query({
      query: () => '/rfqs/stats',
      providesTags: ['Rfq'],
    }),
    getRfq: builder.query({
      query: (id) => `/rfqs/${id}`,
      providesTags: (result, error, id) => [{ type: 'Rfq', id }],
    }),
    createRfq: builder.mutation({
      query: (rfqData) => ({
        url: '/rfqs',
        method: 'POST',
        body: rfqData,
      }),
      invalidatesTags: ['Rfq'],
    }),
    updateRfqStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/rfqs/${id}/status`,
        method: 'PUT',
        body: { status },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Rfq', id }, 'Rfq'],
    }),
    getRfqMessages: builder.query({
      query: (id) => `/rfqs/${id}/messages`,
      providesTags: (result, error, id) => [{ type: 'Rfq', id }],
    }),
    getSupplierRfqs: builder.query({
      query: () => '/rfqs/supplier',
      providesTags: ['Rfq'],
    }),
    replyToRfq: builder.mutation({
      query: ({ id, data }) => ({
        url: `/rfqs/${id}/messages`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Rfq', id }],
    }),
  }),
});

export const {
  useGetRfqsQuery,
  useGetRfqStatsQuery,
  useGetRfqQuery,
  useCreateRfqMutation,
  useUpdateRfqStatusMutation,
  useGetRfqMessagesQuery,
  useGetSupplierRfqsQuery,
  useReplyToRfqMutation,
} = rfqsApi;
