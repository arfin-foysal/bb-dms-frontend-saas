import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { headers } from "../utils/ApiHeaders";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUserList: builder.query({
      query: () => ({
        url: "users-list",
        method: "GET",
        headers,
      }),
      providesTags: ["User"],
    }),

    createUsers: builder.mutation({
      query: (body) => {
        return {
          url: `create-users`,
          method: "POST",
          body: body,
          headers,
        };
      },
      invalidatesTags: ["User"],
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users-delete/${id}`,
        method: "DELETE",
        headers,
      }),
      invalidatesTags: ["User"],
    }),

    updateUser: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `users-update/${id}`,
          method: 'POST',
          body: data,
          headers:headers
        };
      },
      invalidatesTags: ["User"],
    
    }),


    resetPassword: builder.mutation({
      query: (body) => {
        return {
          url: `admin/reset-password`,
          method: "POST",
          body: body,
          headers,
        };
      },
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUserListQuery,
  useCreateUsersMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = userApi;
