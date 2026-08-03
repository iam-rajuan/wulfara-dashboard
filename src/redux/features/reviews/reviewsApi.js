import { apiSlice } from '../../api/apiSlice';

export const reviewsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createReview: builder.mutation({
      query: (data) => ({
        url: '/reviews',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Supplier', 'Rfq'], // Invalidating to refresh supplier data or RFQ if needed
    }),
    getSupplierReviews: builder.query({
      query: (supplierId) => ({
        url: `/reviews/supplier/${supplierId}`,
        method: 'GET',
      }),
      providesTags: ['Review'],
    }),
  }),
});

export const { useCreateReviewMutation, useGetSupplierReviewsQuery } = reviewsApi;
