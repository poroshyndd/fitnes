// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit'
import { trainingApi }   from '../features/trainingApi'
import { profileApi }    from '../features/profileApi'

const store = configureStore({
  reducer: {
    [trainingApi.reducerPath]: trainingApi.reducer,
    [profileApi.reducerPath]:  profileApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(trainingApi.middleware, profileApi.middleware),
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
