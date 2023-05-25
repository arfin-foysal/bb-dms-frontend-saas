import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { headers } from "../utils/ApiHeaders";
export const publishApi = createApi({
  reducerPath: 'publishApi',
  baseQuery: fetchBaseQuery({
    baseUrl:import.meta.env.VITE_API_URL
  }),
  tagTypes: ['Publish'],

  endpoints: (builder) => ({
    adminUnpublishDocumentList: builder.query({
      query: () => ({
        url: `adminunpublish_document_list`,
        method: 'GET',
        headers
      }),
      providesTags: ['Publish', 'DocumentData']
    }),

    AllPublishDocument: builder.query({
      query: ({ search }) => ({
        url: `all_publish_document?search=${search}`,
        method: 'GET',
        headers
      }),
      providesTags: ['Publish']
    }),
    
    yourDocument: builder.query({
      query: () => ({
        url: `your_document`,
        method: 'GET',
        headers
      }),
      providesTags: ['Publish']
    }),

    adminDocumentPublish: builder.mutation({
      query: (id) => {
        return {
          url: `admin_document_publish/${id}`,
          method: 'POST',
          headers
        };
      },
      invalidatesTags: ['Publish']
    }),

    deleteUnpublishDocument: builder.mutation({
      query: (id) => ({
        url: `document/${id}`,
        method: 'DELETE',
        headers
      }),
      invalidatesTags: ['Publish']
    }),

    unpublishDocument: builder.query({
      query: (id) => ({
        url: `document/${id}`,
        method: 'GET',
        headers
      }),
      // invalidatesTags: ['DocumentData'],
      providesTags: ['Publish']
    }),
    dashboardPublishDocument: builder.query({
      query: () => ({
        url: `dashboard_Publish_Document`,
        method: 'GET',
        headers
      }),
      providesTags: ['Publish']
    }),
    dashboardDetails: builder.query({
      query: () => ({
        url: `dashboard-details`,
        method: 'GET',
        headers
      }),
      providesTags: ['Publish']
    })
,

  })
});

export const {
  useAdminUnpublishDocumentListQuery,
  useAdminDocumentPublishMutation,
  useDeleteUnpublishDocumentMutation,
  useUnpublishDocumentQuery,
  useAllPublishDocumentQuery,
  useYourDocumentQuery,
  useDashboardPublishDocumentQuery,
  useDashboardDetailsQuery
} = publishApi;
