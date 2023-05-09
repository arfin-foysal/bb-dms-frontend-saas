import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { headers } from "../utils/ApiHeaders";

export const thirdSubCategoryApi = createApi({
  reducerPath: "thirdSubCategoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    allThirdSubCategory: builder.query({
      query: () => ({
        url: `sub_sub_category_list`,
        method: "GET",
        headers: headers,
      }),
      providesTags: ["thirdSubCategory"],
    }),

    createThirdSubCategory: builder.mutation({
      query: (catagory) => {
        return {
          url: `create_sub_sub_category`,
          method: "POST",
          body: catagory,
          headers: headers,
        };
      },
      invalidatesTags: ["thirdSubCategory"],
    }),
    deleteThirdSubCategory: builder.mutation({
      query: (id) => ({
        url: `delete_sub_sub_category/${id}`,
        method: "DELETE",
        headers: headers,
      }),
      invalidatesTags: ["thirdSubCategory"],
    }),

    updateThirdSubCatagory: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `update_sub_sub_category/${id}`,
          method: "POST",
          body: data,
          headers: headers,
        };
      },
      invalidatesTags: ["thirdSubCategory"],
    }),

    //subCatagoryController

    subCategoryByCategoryId: builder.query({
      query: (id) => ({
        url: `sub_category_by_category/${id}`,
        method: "GET",
        headers: headers,
      }),
      providesTags: ["thirdSubCategory"],
    }),
    thirdCateBySubCateId: builder.query({
      query: (id) => ({
        url: `subsub-category-by-sub-category-id/${id}`,
        method: "GET",
        headers: headers,
      }),
      providesTags: ["thirdSubCategory"],
    }),
  }),
});

export const {
  useAllThirdSubCategoryQuery,
  useSubCategoryByCategoryIdQuery,
  useCreateThirdSubCategoryMutation,
  useDeleteThirdSubCategoryMutation,
  useUpdateThirdSubCatagoryMutation,
  useThirdCateBySubCateIdQuery,

} = thirdSubCategoryApi;
