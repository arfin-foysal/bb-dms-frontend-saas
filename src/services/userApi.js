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

    superAdminDelete: builder.mutation({
      query: (id) => ({
        url: `super-admin-delete/${id}`,
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


    passwordChange: builder.mutation({
      query: (body) => {
        return {
          url: `password-change`,
          method: "POST",
          body: body,
          headers,
        };
      },
      invalidatesTags: ["User"],
    }),

    
    userProfile: builder.query({
      query: (id) => ({
        url: `users/${id}`,
        method: "GET",
        headers,
      }),
      // invalidatesTags: ['DocumentData'],
      invalidatesTags: ["User"],
    }),

    superAdminCreateOrUpdateAndCompanyAssign : builder.mutation({
      query: (body) => {
        return {
          url: `superadmin-create-or-update-and-company-assign`,
          method: "POST",
          body: body,
          headers,
        };
      },
      invalidatesTags: ["User"],
    }),
  superAdminList: builder.query({
      query: () => ({
        url: "super-admin-list",
        method: "GET",
        headers,
      }),
      providesTags: ["User"],
    }),
  }),
});

export const {
  useGetUserListQuery,
  useCreateUsersMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useUserProfileQuery,
  useSuperAdminCreateOrUpdateAndCompanyAssignMutation,
  useSuperAdminListQuery,
  useSuperAdminDeleteMutation,
  usePasswordChangeMutation

} = userApi;
