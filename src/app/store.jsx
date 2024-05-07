import { configureStore } from '@reduxjs/toolkit'
import apiSlice from '../features/api/apiSlice'

export const store = configureStore({
  reducer: {
    api:apiSlice,
  },
})