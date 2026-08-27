import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '../../config/urls';

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState()?.auth?.token || localStorage.getItem('token');
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: ['Auth', 'User', 'Category', 'Listing', 'Rfq', 'Subscription', 'Page', 'Banner', 'Payment', 'Onboarding', 'AdminRole', 'Notification'],
  endpoints: () => ({}),
});
