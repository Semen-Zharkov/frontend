import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { api } from './services/api'
import { usersApi } from './services/users'
import { authApi } from './services/auth'

export const store = configureStore({
  reducer: {
		[usersApi.reducerPath]: usersApi.reducer,
		[authApi.reducerPath]: authApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(usersApi.middleware)
      .concat(authApi.middleware) 
})



setupListeners(store.dispatch)