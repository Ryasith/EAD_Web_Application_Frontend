import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import userReducer from '../features/user/userSlice'
import reservationReducer from '../features/reservation/reservationSlice'
import trainReducer from '../features/train/trainSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    reservation: reservationReducer,
    trains:trainReducer,
  },
})