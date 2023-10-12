import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import userReducer from '../features/auth/userSlice'
import reservationReducer from '../features/auth/reservationSlice'
import trainReducer from '../features/auth/trainSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    reservation: reservationReducer,
    trains:trainReducer,
  },
})