import { apiSlice } from '../../api/apiSlice';

export const seoApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSeoSettings: builder.query({
      query: () => '/seo',
      providesTags: ['Seo'],
    }),
    getSeoByPath: builder.query({
      query: (path) => `/seo/${encodeURIComponent(path)}`,
      providesTags: (result, error, path) => [{ type: 'Seo', id: path }],
    }),
    updateSeoSettings: builder.mutation({
      query: (seoData) => ({
        url: '/seo',
        method: 'PUT',
        body: seoData,
      }),
      invalidatesTags: ['Seo'],
    }),
  }),
});

export const {
  useGetSeoSettingsQuery,
  useGetSeoByPathQuery,
  useUpdateSeoSettingsMutation,
} = seoApi;
