import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: "https://real-state-blog.vercel.app/api/auth",
        credentials: 'include',  // This allows cookies to be included in the requests
    }),
    tagTypes: ["User"],  // Define tag types for caching and invalidation
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (newUser) => ({
                url: "/register",
                method: "POST",
                body: newUser,
            }),
        }),
        loginUser: builder.mutation({
            query: (credentials) => ({
                url: "/login", 
                method: "POST",
                body: credentials,
            }),
        }),
        logoutUser: builder.mutation({
            query: () => ({
                url: "/logout", 
                method: "POST",
            }),
        }),
        getUser: builder.query({
            query: () => ({
                url: "/users", 
                method: "GET",
            }),
            providesTags: ["User"],  // Provides a 'User' tag for caching
            refetchOnMount: true,  // Refetches data when the component using this query mounts
        }),
        deleteUser: builder.mutation({
            query: (userId) => ({
                url: `/users/${userId}`, 
                method: "DELETE",
            }),
            invalidatesTags: ["User"],  // Invalidates 'User' tag to refresh any related cached data
        }),
        updateUserRole: builder.mutation({
            query: ({ userId, role }) => ({
                url: `/users/${userId}`, 
                method: "PUT",
                body: { role },
            }),
            invalidatesTags: ["User"],  // Invalidates 'User' tag to refresh any related cached data
        }),
    }),
});

// Exporting all hooks generated by createApi for use in components
export const { 
    useRegisterUserMutation, 
    useLoginUserMutation,
    useLogoutUserMutation,
    useGetUserQuery,
    useDeleteUserMutation,
    useUpdateUserRoleMutation 
} = authApi;

export default authApi;
