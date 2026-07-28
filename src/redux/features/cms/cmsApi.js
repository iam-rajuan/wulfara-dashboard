import { apiSlice } from '../../api/apiSlice';

export const cmsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Banners
    getBanners: builder.query({
      query: () => '/cms/banners',
      providesTags: ['Banner'],
    }),
    createBanner: builder.mutation({
      query: (bannerData) => ({
        url: '/cms/banners',
        method: 'POST',
        body: bannerData,
      }),
      invalidatesTags: ['Banner'],
    }),
    updateBanner: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/cms/banners/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Banner', id }, 'Banner'],
    }),
    deleteBanner: builder.mutation({
      query: (id) => ({
        url: `/cms/banners/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Banner'],
    }),
    
    // Pages
    getPages: builder.query({
      query: () => '/cms/pages',
      providesTags: ['Page'],
    }),
    createPage: builder.mutation({
      query: (pageData) => ({
        url: '/cms/pages',
        method: 'POST',
        body: pageData,
      }),
      invalidatesTags: ['Page'],
    }),
    updatePage: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/cms/pages/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Page', id }, 'Page'],
    }),
    deletePage: builder.mutation({
      query: (id) => ({
        url: `/cms/pages/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Page'],
    }),
  }),
});

export const {
  useGetBannersQuery,
  useCreateBannerMutation,
  useUpdateBannerMutation,
  useDeleteBannerMutation,
  useGetPagesQuery,
  useCreatePageMutation,
  useUpdatePageMutation,
  useDeletePageMutation,
} = cmsApi;
