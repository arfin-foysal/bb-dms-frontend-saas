import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { headers } from "../utils/ApiHeaders";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  tagTypes: ["Category"],
  endpoints: (builder) => ({
     allCategory: builder.query({
      query: () => ({
        url: `category`,
        method: 'GET',
        headers:headers
      }),
      providesTags: ['Category']
     }),
    //  create_category

    createCategory: builder.mutation({
      query: (catagory) => {
        return {
          url: `create_category`,
          method: 'POST',
          body: catagory,
          headers: headers
        };
      },
      invalidatesTags: ['Category']
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `category/${id}`,
        method: 'DELETE',
        headers: headers
      }),
      invalidatesTags: ['Category']
    }),

    updateCatagory: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `category_update/${id}`,
          method: 'POST',
          body: data,
          headers:headers
        };
      },
      invalidatesTags: ['Category']
    }),
  }),
  
});

export const {
  useAllCategoryQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCatagoryMutation,



} = categoryApi;
