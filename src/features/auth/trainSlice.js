import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import trainService from './trainService'

const initialState = {
  resevationObj:{},
  availableTrains:  [],
  allTrains: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// available Trains
export const availableTrains = createAsyncThunk(
  'trains/availableTrains',
  async (resevationObj, thunkAPI) => {
    try {
      console.log(resevationObj);
      return await trainService.availableTrains(resevationObj)
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

// all trains
export const alltrains = createAsyncThunk(
  'trains/alltrains',
  async (thunkAPI) => {
    try {
      return await trainService.TrainList()
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

export const trainSlice = createSlice({
  name: 'trains',
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
      .addCase(availableTrains.pending, (state) => {
        state.isLoading = true
      })
      .addCase(availableTrains.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.availableTrains = action.payload
      })
      .addCase(availableTrains.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.availableTrains = null
      })
      .addCase(alltrains.pending, (state) => {
        state.isLoading = true
      })
      .addCase(alltrains.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.allTrains = action.payload
      })
      .addCase(alltrains.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.allTrains = null
      })
  },
})

export const { reset } = trainSlice.actions
export default trainSlice.reducer