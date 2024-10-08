import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const apiUrl = process.env.REACT_APP_API_URL;
export const usersApi= createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: apiUrl}),
  endpoints: (builder) => ({
    getInformationUser: builder.query({
      query: ()=>'users/me'
    }),
  }),
})


export const { useGetInformationUserQuery } = usersApi