import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const apiUrl = process.env.REACT_APP_API_URL;
console.log('logOut')
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: apiUrl}),
  endpoints: (builder) => ({
    logOut: builder.query({
      query: ()=>({
        url: 'auth/logout',
        method: 'POST'
    })
    }),
  }),
})


export const {useLazyLogOutQuery}= authApi