import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const apiUrl = process.env.REACT_APP_API_URL;
export const adminApi = createApi({
  reducerPath: 'adminApi',
  baseQuery: fetchBaseQuery({ baseUrl: apiUrl}),
  endpoints: (builder) => ({
    getListFeedback: builder.mutation({
      query: (flag)=>({
        url: `/admin/get_feedback?all_feedbacks=${flag}`,
        method: 'POST'
      })
    }),
    getListUserVerification: builder.query({
      query: () => `/admin/requests`
    })
  })
})

export const {useGetListFeedbackMutation, useLazyGetListUserVerificationQuery} = adminApi