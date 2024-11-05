import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const apiUrl = process.env.REACT_APP_API_URL;
export const docksApi = createApi({
  reducerPath: 'docksApi',
  baseQuery: fetchBaseQuery({ baseUrl: apiUrl}),
  endpoints: (builder) => ({
    getDocks: builder.query({
      query: (userURL)=>({
        url: `/docks/${userURL}`
        })    
    }),
    uploadFile: builder.mutation({
      query: ({dockName, dockDescription, formDatas})=>({
        url: `docks/upload-dock?dock_name=${dockName}&dock_description=${dockDescription}`,
        method: 'POST',
        credentials: 'include',
        body: formDatas
      })
    }),
    removingDocumentation: builder.mutation({
      query: (doc_name)=>({
        url: `/docks/delete-my?doc_name=${doc_name}`,
        method: "DELETE",
        credentials: "include",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
      })
    })
  })
})


export const {useGetDocksQuery, useUploadFileMutation, useRemovingDocumentationMutation} = docksApi