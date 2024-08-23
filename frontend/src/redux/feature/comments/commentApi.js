import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'; // Ensure you're importing from the right package

const commentApi = createApi({
  reducerPath: 'commentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE_URL}/api/comments`,
    credentials: 'include',
  }),
  tagTypes: ['Comments'],
  endpoints: (builder) => ({
    postComment: builder.mutation({
      query: (commentData) => ({
        url: '/post-comment',
        method: 'POST',
        body: commentData,
      }),
      invalidatesTags: (result, error, { postId }) => [{ type: 'Comments', id: postId }],
    }),
    getComments: builder.query({
      query: () => ({
        url: '/total-comment',
        method: 'GET',
      }),
    }),
  }),
});

export const { usePostCommentMutation, useGetCommentsQuery } = commentApi;
export default commentApi;
