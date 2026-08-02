import { apiSlice } from '../../api/apiSlice';

export const listingsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getListings: builder.query({
      query: () => '/suppliers',
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
      invalidatesTags: (result, error, { id }) => [{ type: 'Listing', id }, 'Listing'],
    }),
    getSupplierDashboard: builder.query({
      query: () => '/suppliers/dashboard',
      providesTags: ['Listing'],
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
  useGetSupplierDashboardQuery,
  useFeatureListingMutation,
  useUpdateListingMutation,
  useGetSupplierUploadUrlMutation,
} = listingsApi;
