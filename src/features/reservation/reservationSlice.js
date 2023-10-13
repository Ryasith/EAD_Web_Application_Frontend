import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import reservationService from './reservationService'

const initialState = {
  reservationList:  [],
  resevationObj:{},
  availableReservations:  [],
  completedReservation:{},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// All reservation
export const reservationlist = createAsyncThunk(
  'reservations/reservationList',
  async (thunkAPI) => {
    try {
      return await reservationService.reservationList()
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// checkout reservation
export const checkoutResevation = createAsyncThunk(
  'reservations/checkoutResevation',
  async (checkoutObj, thunkAPI) => {
    console.log(checkoutObj);
    try {
      return await reservationService.checkoutResevation(checkoutObj)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get Reservation by ID
export const getreservation = createAsyncThunk(
  'reservations/getbyID',
  async (id,thunkAPI) => {
    try {
      return await reservationService.getReservation(id)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Update Reservation by ID
export const updatereservation = createAsyncThunk(
  'reservations/updatereservation',
  async (id,reservationObj,thunkAPI) => {
    try {
      return await reservationService.updateReservation(id,reservationObj)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Delete Reservation
export const deletereservation = createAsyncThunk(
  'reservations/deletereservation',
  async (id,thunkAPI) => {
    try {
      return await reservationService.deleteReservation(id)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const reservationSlice = createSlice({
  name: 'reservation',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(reservationlist.pending, (state) => {
        state.isLoading = true
      })
      .addCase(reservationlist.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.reservationList = action.payload
      })
      .addCase(reservationlist.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.reservationList = []
      })
      .addCase(checkoutResevation.pending, (state) => {
        state.isLoading = true
      })
      .addCase(checkoutResevation.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.completedReservation = action.payload
      })
      .addCase(checkoutResevation.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.completedReservation = null
      })
      .addCase(getreservation.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getreservation.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.resevationObj = action.payload
      })
      .addCase(getreservation.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.resevationObj = {}
      })
      .addCase(updatereservation.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updatereservation.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.message = action.payload
      })
      .addCase(updatereservation.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.resevationObj = {}
      })
      .addCase(deletereservation.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deletereservation.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.message = action.payload
      })
      .addCase(deletereservation.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = reservationSlice.actions
export default reservationSlice.reducer