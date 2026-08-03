import { apiSlice } from '../../api/apiSlice';

export const messagesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getConversations: builder.query({
      query: () => '/messages/conversations',
      providesTags: ['Message'],
    }),
    getMessages: builder.query({
      query: (conversationId) => `/messages/conversations/${conversationId}`,
      providesTags: ['Message'],
    }),
    sendMessage: builder.mutation({
      query: ({ conversationId, data }) => ({
        url: `/messages/conversations/${conversationId}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Message'],
    }),
  }),
});

export const {
  useGetConversationsQuery,
  useGetMessagesQuery,
  useSendMessageMutation,
} = messagesApi;
