import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { usersApi } from './services/users'
import { authApi } from './services/auth'
import { docksApi } from './services/docks'
import { contestApi } from './services/contest'
import { adminApi } from './services/admin'
import reducer from '../features/editUserData'

export const store = configureStore({
  reducer: {
		updateUser: reducer,
		[usersApi.reducerPath]: usersApi.reducer,
		[authApi.reducerPath]: authApi.reducer,
		[docksApi.reducerPath]: docksApi.reducer,
		[contestApi.reducerPath]: contestApi.reducer,
		[adminApi.reducerPath]: adminApi.reducer
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(usersApi.middleware)
      		.concat(authApi.middleware)
			.concat(docksApi.middleware)
			.concat(contestApi.middleware)
			.concat(adminApi.middleware)
})



setupListeners(store.dispatch, store.getState)
