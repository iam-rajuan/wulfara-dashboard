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
  }),
});

export const {
  useGetListingsQuery,
  useGetListingQuery,
  useReviewListingMutation,
} = listingsApi;
