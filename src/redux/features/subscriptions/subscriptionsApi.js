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
    getAdminPlans: builder.query({
      query: () => '/subscriptions/admin/plans',
      providesTags: ['Subscription'],
    }),
    getAdminPlan: builder.query({
      query: (id) => `/subscriptions/admin/plans/${id}`,
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
      async onQueryStarted({ id, planData }, { dispatch, queryFulfilled }) {
        const applyPlanPatch = (existingPlan) => ({
          ...existingPlan,
          ...planData,
        });

        const optimisticPatches = [
          dispatch(
            subscriptionsApi.util.updateQueryData('getAdminPlan', id, (draft) => {
              if (draft?.data) {
                draft.data = applyPlanPatch(draft.data);
              }
            })
          ),
          dispatch(
            subscriptionsApi.util.updateQueryData('getAdminPlans', undefined, (draft) => {
              if (Array.isArray(draft?.data)) {
                const planIndex = draft.data.findIndex((plan) => plan._id === id);
                if (planIndex >= 0) {
                  draft.data[planIndex] = applyPlanPatch(draft.data[planIndex]);
                }
              }
            })
          ),
        ];

        ['all', 'active', 'draft'].forEach((status) => {
          optimisticPatches.push(
            dispatch(
              subscriptionsApi.util.updateQueryData(
                'getAdminSubscriptionOverview',
                status === 'all' ? { status: 'all' } : { status },
                (draft) => {
                  if (!Array.isArray(draft?.data?.plans)) {
                    return;
                  }

                  const planIndex = draft.data.plans.findIndex((plan) => plan._id === id);
                  if (planIndex < 0) {
                    return;
                  }

                  const mergedPlan = applyPlanPatch(draft.data.plans[planIndex]);
                  const shouldAppear =
                    status === 'all' ||
                    (status === 'active' && mergedPlan.isActive) ||
                    (status === 'draft' && !mergedPlan.isActive);

                  if (shouldAppear) {
                    draft.data.plans[planIndex] = mergedPlan;
                  } else {
                    draft.data.plans.splice(planIndex, 1);
                  }
                }
              )
            )
          );
        });

        try {
          const { data } = await queryFulfilled;
          const updatedPlan = data?.data;

          if (!updatedPlan?._id) {
            return;
          }

          dispatch(
            subscriptionsApi.util.updateQueryData('getAdminPlan', id, (draft) => {
              if (draft?.data) {
                draft.data = updatedPlan;
              }
            })
          );

          dispatch(
            subscriptionsApi.util.updateQueryData('getAdminPlans', undefined, (draft) => {
              if (Array.isArray(draft?.data)) {
                const planIndex = draft.data.findIndex((plan) => plan._id === updatedPlan._id);
                if (planIndex >= 0) {
                  draft.data[planIndex] = {
                    ...draft.data[planIndex],
                    ...updatedPlan,
                  };
                }
              }
            })
          );

          ['all', 'active', 'draft'].forEach((status) => {
            dispatch(
              subscriptionsApi.util.updateQueryData(
                'getAdminSubscriptionOverview',
                status === 'all' ? { status: 'all' } : { status },
                (draft) => {
                  if (!Array.isArray(draft?.data?.plans)) {
                    return;
                  }

                  const planIndex = draft.data.plans.findIndex((plan) => plan._id === updatedPlan._id);

                  if (planIndex >= 0) {
                    const existingPlan = draft.data.plans[planIndex];
                    const mergedPlan = {
                      ...existingPlan,
                      ...updatedPlan,
                    };

                    const shouldAppear =
                      status === 'all' ||
                      (status === 'active' && mergedPlan.isActive) ||
                      (status === 'draft' && !mergedPlan.isActive);

                    if (shouldAppear) {
                      draft.data.plans[planIndex] = mergedPlan;
                    } else {
                      draft.data.plans.splice(planIndex, 1);
                    }
                  } else {
                    const shouldAppear =
                      status === 'all' ||
                      (status === 'active' && updatedPlan.isActive) ||
                      (status === 'draft' && !updatedPlan.isActive);

                    if (shouldAppear) {
                      draft.data.plans.unshift(updatedPlan);
                    }
                  }
                }
              )
            );
          });
        } catch {
          optimisticPatches.forEach((patch) => patch.undo());
        }
      },
      invalidatesTags: (result, error, { id }) => [{ type: 'Subscription', id }, 'Subscription'],
    }),
    deletePlan: builder.mutation({
      query: (id) => ({
        url: `/subscriptions/plans/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Subscription'],
    }),
    createCheckoutSession: builder.mutation({
      query: (data) => ({
        url: '/subscriptions/checkout-session',
        method: 'POST',
        body: data,
      }),
    }),
    getCheckoutStatus: builder.query({
      query: ({ sessionId, supplierId } = {}) => {
        const searchParams = new URLSearchParams();
        if (sessionId) {
          searchParams.set('session_id', sessionId);
        }
        if (supplierId) {
          searchParams.set('supplierId', supplierId);
        }

        const queryString = searchParams.toString();
        return `/subscriptions/checkout-status${queryString ? `?${queryString}` : ''}`;
      },
      providesTags: ['Subscription', 'Payment', 'Onboarding', 'Listing'],
    }),
    getInvoices: builder.query({
      query: () => '/subscriptions/invoices',
      providesTags: ['Invoice'],
    }),
    getCurrentSubscription: builder.query({
      query: () => '/subscriptions/current',
      providesTags: ['Subscription'],
    }),
    cancelCurrentSubscription: builder.mutation({
      query: () => ({
        url: '/subscriptions/current/cancel',
        method: 'POST',
      }),
      invalidatesTags: ['Subscription', 'Payment', 'Onboarding', 'Listing'],
    }),
    getAllPayments: builder.query({
      query: () => '/subscriptions/admin/payments',
      providesTags: ['Payment'],
    }),
    getActiveSubscriptions: builder.query({
      query: () => '/subscriptions/admin/active',
      providesTags: ['Subscription'],
    }),
    getAdminSubscriptionOverview: builder.query({
      query: (params = {}) => {
        const searchParams = new URLSearchParams();
        if (params.status && params.status !== 'all') {
          searchParams.set('status', params.status);
        }

        const queryString = searchParams.toString();
        return `/subscriptions/admin/overview${queryString ? `?${queryString}` : ''}`;
      },
      providesTags: ['Subscription', 'Payment'],
    }),
  }),
});

export const {
  useGetPlansQuery,
  useGetPlanQuery,
  useGetAdminPlansQuery,
  useGetAdminPlanQuery,
  useCreatePlanMutation,
  useUpdatePlanMutation,
  useDeletePlanMutation,
  useCreateCheckoutSessionMutation,
  useLazyGetCheckoutStatusQuery,
  useGetCurrentSubscriptionQuery,
  useCancelCurrentSubscriptionMutation,
  useGetInvoicesQuery,
  useGetAllPaymentsQuery,
  useGetActiveSubscriptionsQuery,
  useGetAdminSubscriptionOverviewQuery,
} = subscriptionsApi;
