import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { headers } from "../utils/ApiHeaders";

export const subCategoryApi = createApi({
  reducerPath: "subCategoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
     allSubCategory: builder.query({
      query: () => ({
        url: `sub_category_list`,
        method: 'GET',
        headers:headers
      }),
      providesTags: ['SubCategory']
     }),


    createSubCategory: builder.mutation({
      query: (catagory) => {
        return {
          url: `create_sub_category`,
          method: 'POST',
          body: catagory,
          headers: headers
        };
      },
      invalidatesTags: ['SubCategory']
    }),
    deleteSubCategory: builder.mutation({
      query: (id) => ({
        url: `delete_sub_category/${id}`,
        method: 'DELETE',
        headers: headers
      }),
      invalidatesTags: ['SubCategory']
    }),

    updateSubCatagory: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `update_sub_category/${id}`,
          method: 'POST',
          body: data,
          headers:headers
        };
      },
      invalidatesTags: ['SubCategory']
    }),
  }),
  
});

export const {
  useAllSubCategoryQuery,
  useCreateSubCategoryMutation,
  useDeleteSubCategoryMutation,
  useUpdateSubCatagoryMutation,





} = subCategoryApi;
