import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { headers } from "../utils/ApiHeaders";

export const clientInfoApi = createApi({
  reducerPath: "clientInfoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  tagTypes: ["ClientInfo"],
  endpoints: (builder) => ({
     allClientList: builder.query({
      query: () => ({
        url: `all-client-list`,
        method: 'GET',
        headers:headers
      }),
      providesTags: ['ClientInfo']
     }),


    addClientInfo: builder.mutation({
      query: (body) => {
        return {
          url: `add-client-info`,
          method: 'POST',
          body: body,
          headers: headers
        };
      },
      invalidatesTags: ['ClientInfo']
    }),

  }),
  
});

export const {

  useAddClientInfoMutation,
  useAllClientListQuery,
} = clientInfoApi;
