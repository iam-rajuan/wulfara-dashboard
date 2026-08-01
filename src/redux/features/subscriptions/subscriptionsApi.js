import { apiSlice } from '../../api/apiSlice';

export const subscriptionsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPlans: builder.query({
      query: () => '/subscriptions/plans',
      providesTags: ['Subscription'],
    }),
    getPlan: builder.query({
      query: (id) => `/subscriptions/plans/${id}`,
      providesTags: (result, error, id) => [{ type: 'Subscription', id }],
    }),
    createPlan: builder.mutation({
      query: (planData) => ({
        url: '/subscriptions/plans',
        method: 'POST',
        body: planData,
      }),
      invalidatesTags: ['Subscription'],
    }),
    updatePlan: builder.mutation({
      query: ({ id, planData }) => ({
        url: `/subscriptions/plans/${id}`,
        method: 'PUT',
        body: planData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Subscription', id }, 'Subscription'],
    }),
    createCheckoutSession: builder.mutation({
      query: (data) => ({
        url: '/subscriptions/checkout-session',
        method: 'POST',
        body: data,
      }),
    }),
    getInvoices: builder.query({
      query: () => '/subscriptions/invoices',
      providesTags: ['Invoice'],
    }),
  }),
});

export const {
  useGetPlansQuery,
  useGetPlanQuery,
  useCreatePlanMutation,
  useUpdatePlanMutation,
  useCreateCheckoutSessionMutation,
  useGetInvoicesQuery,
} = subscriptionsApi;
