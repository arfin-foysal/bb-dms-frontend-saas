import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { headers } from "../utils/ApiHeaders";
export const groupApi = createApi({
  reducerPath: 'groupApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL
  }),
  tagTypes: ['Group'],

  endpoints: (builder) => ({
    allUserforGroup: builder.query({
      query: () => ({
        url: `all_user_for_group`,
        method: 'GET',
        headers
      }),
      providesTags: ['Group']
    }),

    createGroup: builder.mutation({
      query: (group) => {
        return {
          url: `create_group`,
          method: 'POST',
          body: group,
          headers
        };
      },
      invalidatesTags: ['Group']
    }),

    userWiseGroupView: builder.query({
      query: () => ({
        url: `user_wise_group_view`,
        method: 'GET',
        headers
      }),
      providesTags: ['Group']
    }),

     addGroupDocument: builder.mutation({
      query: (document) => {
        return {
          url: `create_group_documnet`,
          method: 'POST',
          body: document,
          headers
        };
      },
      invalidatesTags: ['Group']
    }),
 

    deleteGroup: builder.mutation({
      query: (id) => ({
        url: `delete_group/${id}`,
        method: 'DELETE',
        headers
      }),
      invalidatesTags: ['Group']
    }),
    // get_group_document
    groupDocument: builder.query({
      query: (id) => ({
        url: `get_group_document/${id}`,
        method: 'GET',
        headers
      }),
      providesTags: ['Group']
    }),

    singalGroup: builder.query({
      query: (id) => ({
        url: `get_singal_group/${id}`,
        method: 'GET',
        headers
      }),
      providesTags: ['Group']
    }),
    updateGroup: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `group_update/${id}`,
          method: 'POST',
          body: data,
          headers

        };
      },
      invalidatesTags: ['Group']
    }),
    // group_singal_document

   groupSingalDocumnet: builder.query({
      query: (id) => ({
        url: `group_singal_document/${id}`,
        method: 'GET',
        headers
      }),
      providesTags: ['Group']
   }),
  //  delete_group_documnet
   
  groupDeleteDocument: builder.mutation({
    query: (id) => ({
      url: `delete_group_documnet/${id}`,
      method: 'DELETE',
      headers
    }),
    invalidatesTags: ['Group']
  }),
  // group_documnet_update

  groupDocumentUpdate: builder.mutation({
    query: ({ id, data }) => {
      return {
        url: `group_documnet_update/${id}`,
        method: 'POST',
        body: data,
        headers

      };
    },
    invalidatesTags: ['Group']
  }),
  // share_document
  shareDocument: builder.mutation({
    query: (document) => {
      return {
        url: `share_document`,
        method: 'POST',
        body: document,
        headers
      };
    },
    invalidatesTags: ['Group']
  }),
  })
});

export const {
  useAllUserforGroupQuery,
  useCreateGroupMutation,
  useUserWiseGroupViewQuery,
  useAddGroupDocumentMutation,
  useDeleteGroupMutation,
  useSingalGroupQuery,
  useUpdateGroupMutation,
  useGroupSingalDocumnetQuery,
  useGroupDeleteDocumentMutation,
  useGroupDocumentUpdateMutation,
  useShareDocumentMutation,
  useGroupDocumentQuery
  
} = groupApi;

