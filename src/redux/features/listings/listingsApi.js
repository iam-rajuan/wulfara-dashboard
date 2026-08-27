import { apiSlice } from '../../api/apiSlice';

export const listingsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getListings: builder.query({
      query: (queryString = '') => `/suppliers${queryString ? `?${queryString}` : ''}`,
      providesTags: ['Listing'],
    }),
    getListing: builder.query({
      query: (id) => `/suppliers/${id}`,
      providesTags: (result, error, id) => [{ type: 'Listing', id }],
    }),
    reviewListing: builder.mutation({
      query: ({ id, listingStatus }) => ({
        url: `/suppliers/${id}/review`,
        method: 'PUT',
        body: { listingStatus },
      }),
      async onQueryStarted({ id, listingStatus }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData('getListing', id, (draft) => {
            if (!draft?.data) {
              return;
            }

            draft.data.listingStatus = listingStatus;
            draft.data.isApproved = listingStatus === 'Approved';
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: (result, error, { id }) => [{ type: 'Listing', id }, 'Listing'],
    }),
    updateSupplierVerification: builder.mutation({
      query: ({ id, data }) => ({
        url: `/suppliers/${id}/verification`,
        method: 'PUT',
        body: data,
      }),
      async onQueryStarted({ id, data }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData('getListing', id, (draft) => {
            if (!draft?.data) {
              return;
            }

            if (data?.checklist && typeof data.checklist === 'object') {
              draft.data.verificationChecklist = {
                ...(draft.data.verificationChecklist || {}),
                ...data.checklist,
                updatedAt: new Date().toISOString(),
              };
            }

            if (Array.isArray(data?.documents) && Array.isArray(draft.data.verificationDocuments)) {
              data.documents.forEach((documentUpdate) => {
                const document = draft.data.verificationDocuments.find(
                  (item) => item.id === documentUpdate.id
                );

                if (document) {
                  document.reviewStatus = documentUpdate.reviewStatus;
                  document.reviewedAt = new Date().toISOString();
                  if (typeof documentUpdate.reviewNote === 'string') {
                    document.reviewNote = documentUpdate.reviewNote;
                  }
                }
              });
            }
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: (result, error, { id }) => [{ type: 'Listing', id }, 'Listing'],
    }),
    getSupplierDashboard: builder.query({
      query: () => '/suppliers/dashboard',
      providesTags: ['Listing'],
    }),
    getOnboardingStatus: builder.query({
      query: (supplierId) => `/suppliers/onboarding${supplierId ? `?supplierId=${supplierId}` : ''}`,
      providesTags: ['Onboarding', 'Listing'],
    }),
    saveOnboardingIndustry: builder.mutation({
      query: (payload) => ({
        url: '/suppliers/onboarding/industry',
        method: 'PUT',
        body: payload,
      }),
      invalidatesTags: ['Onboarding', 'Listing'],
    }),
    saveOnboardingCompanyInfo: builder.mutation({
      query: (payload) => ({
        url: '/suppliers/onboarding/company-info',
        method: 'PUT',
        body: payload,
      }),
      invalidatesTags: ['Onboarding', 'Listing'],
    }),
    saveOnboardingSubscription: builder.mutation({
      query: (payload) => ({
        url: '/suppliers/onboarding/subscription',
        method: 'PUT',
        body: payload,
      }),
      invalidatesTags: ['Onboarding', 'Listing'],
    }),
    createAdminAssistedSupplier: builder.mutation({
      query: (payload) => ({
        url: '/suppliers/admin-assisted',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Onboarding', 'Listing', 'User'],
    }),
    featureListing: builder.mutation({
      query: ({ id, isFeatured }) => ({
        url: `/suppliers/${id}/feature`,
        method: 'PUT',
        body: { isFeatured },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Listing', id }, 'Listing'],
    }),
    updateListing: builder.mutation({
      query: ({ id, data }) => ({
        url: `/suppliers/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Listing', id }, 'Listing'],
    }),
    getSupplierUploadUrl: builder.mutation({
      query: (data) => ({
        url: '/suppliers/upload-url',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useGetListingsQuery,
  useGetListingQuery,
  useReviewListingMutation,
  useUpdateSupplierVerificationMutation,
  useGetSupplierDashboardQuery,
  useGetOnboardingStatusQuery,
  useSaveOnboardingIndustryMutation,
  useSaveOnboardingCompanyInfoMutation,
  useSaveOnboardingSubscriptionMutation,
  useCreateAdminAssistedSupplierMutation,
  useFeatureListingMutation,
  useUpdateListingMutation,
  useGetSupplierUploadUrlMutation,
} = listingsApi;
