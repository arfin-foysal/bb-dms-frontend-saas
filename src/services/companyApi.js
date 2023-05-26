import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { headers } from "../utils/ApiHeaders";

export const companyApi = createApi({
  reducerPath: "companyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  tagTypes: ["company"],
  endpoints: (builder) => ({
    companyList: builder.query({
      query: () => ({
        url: `company-list`,
        method: 'GET',
        headers:headers
      }),
      providesTags: ['company']
     }),


    createOrUpdateCompany: builder.mutation({
      query: (body) => {
        return {
          url: `create-or-update-company`,
          method: 'POST',
          body: body,
          headers: headers
        };
      },
      invalidatesTags: ['company']
    }),
    deleteCompany: builder.mutation({
      query: (id) => ({
        url: `delete-company/${id}`,
        method: 'DELETE',
        headers: headers
      }),
      invalidatesTags: ['company']
    }),

  }),
  
});

export const {

  useCreateOrUpdateCompanyMutation,
  useCompanyListQuery,
  useDeleteCompanyMutation,




} = companyApi;
