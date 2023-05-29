import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { headers } from "../utils/ApiHeaders";

export const documentApi = createApi({
  reducerPath: "documentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    allCategory: builder.query({
      query: () => ({
        url: `category`,
        method: "GET",
        headers: headers,
      }),
      providesTags: ["Document"],
    }),
    //  create_category

    uploadeDocument: builder.mutation({
      query: (body) => {
        return {
          url: `uploade-document`,
          method: "POST",
          body: body,
          headers: headers,
        };
      },
      invalidatesTags: ["Document"],
    }),

    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `category/${id}`,
        method: "DELETE",
        headers: headers,
      }),
      invalidatesTags: ["Document"],
    }),

    updateCatagory: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `category_update/${id}`,
          method: "POST",
          body: data,
          headers: headers,
        };
      },
      invalidatesTags: ["Document"],
    }),

    //sub-category-folder-by-category-id
    subCateFolderByCateId: builder.query({
      query: (id) => ({
        url: `sub-category-folder-by-category-id/${id}`,
        method: "GET",
        headers,
      }),
      // invalidatesTags: ['DocumentData'],
      providesTags: (result, error, arg) =>
        result
          ? [...result.map(({ id }) => ({ type: "Document", id })), "Document"]
          : ["Document"],
    }),
    cateDocByCateId: builder.query({
      query: (id) => ({
        url: `category-document-by-category-id/${id}`,
        method: "GET",
        headers,
      }),
      // invalidatesTags: ['DocumentData'],
      providesTags: (result, error, arg) =>
        result
          ? [...result.map(({ id }) => ({ type: "Document", id })), "Document"]
          : ["Document"],
    }),
    viewDocument: builder.query({
      query: (id) => ({
        url: `document-view/${id}`,
        method: "GET",
        headers,
      }),
      invalidatesTags: ["Document"],
    }),

    documentpublish: builder.mutation({
      query: (id) => {
        return {
          url: `document_publish/${id}`,
          method: "POST",
          headers,
        };
      },
      invalidatesTags: ["Document"],
    }),
    deleteDocument: builder.mutation({
      query: (id) => ({
        url: `document/${id}`,
        method: "DELETE",
        headers,
      }),
      invalidatesTags: ["Document"],
    }),

    EditDocument: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `document/${id}`,
          method: "POST",
          body: data,
          headers,
        };
      },
      invalidatesTags: ["Document"],
    }),

    thirdSubCategoryFolderBySubCategoryId: builder.query({
      query: (id) => ({
        url: `third-sub-category-by-category-id/${id}`,
        method: "GET",
        headers,
      }),
      // invalidatesTags: ['DocumentData'],
      providesTags: (result, error, arg) =>
        result
          ? [...result.map(({ id }) => ({ type: "Document", id })), "Document"]
          : ["Document"],
    }),

    subCateDocByCateId: builder.query({
      query: (id) => ({
        url: `show_sub_sub_category_document/${id}`,
        method: "GET",
        headers,
      }),
      // invalidatesTags: ['DocumentData'],
      providesTags: (result, error, arg) =>
        result
          ? [...result.map(({ id }) => ({ type: "Document", id })), "Document"]
          : ["Document"],
    }),
    subcategoryDocumentBySubCategoryId: builder.query({
      query: (id) => ({
        url: `sub-category-documnet-by-sub-category-id/${id}`,
        method: "GET",
        headers,
      }),
      // invalidatesTags: ['DocumentData'],
      providesTags: (result, error, arg) =>
        result
          ? [...result.map(({ id }) => ({ type: "Document", id })), "Document"]
          : ["Document"],
    }),

    thirdSubCategoryDocumentByThirdSubCategoryId: builder.query({
      query: (id) => ({
        url: `third-sub-category-by-third-sub-category-id/${id}`,
        method: "GET",
        headers,
      }),
      // invalidatesTags: ['DocumentData'],
      providesTags: (result, error, arg) =>
        result
          ? [...result.map(({ id }) => ({ type: "Document", id })), "Document"]
          : ["Document"],
    }),
    adminCancelDocument: builder.query({
      query: (id) => ({
        url: `admin-cancel-document/${id}`,
        method: "GET",
        headers,
      }),
      // invalidatesTags: ['DocumentData'],
      providesTags: (result, error, arg) =>
        result
          ? [...result.map(({ id }) => ({ type: "Document", id })), "Document"]
          : ["Document"],
    }),
  }),
});

export const {
  useUploadeDocumentMutation,
  useSubCateFolderByCateIdQuery,
  useCateDocByCateIdQuery,
  useViewDocumentQuery,
  useDocumentpublishMutation,
  useDeleteDocumentMutation,
  useEditDocumentMutation,
  useThirdSubCategoryFolderBySubCategoryIdQuery,
  useSubcategoryDocumentBySubCategoryIdQuery,
  useThirdSubCategoryDocumentByThirdSubCategoryIdQuery,
  useLazyAdminCancelDocumentQuery,

} = documentApi;
