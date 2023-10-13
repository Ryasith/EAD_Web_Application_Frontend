import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import trainService from './trainService'

const initialState = {
  resevationObj:{},
  availableTrains:  [],
  allTrains: [],
  train: {},
  train_Type: "",
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

// Create Train
export const createtrain = createAsyncThunk(
  'auth/createtrain',
  async (train, thunkAPI) => {
    try {
      return await trainService.createTrain(train)
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

// Delete Train By Id
export const deletetrain = createAsyncThunk(
  'users/deletetrain',
  async (id,thunkAPI) => {
    try {
      return await trainService.deleteTrain(id)
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

// disable Train
export const disabletrain = createAsyncThunk(
  'users/disabletrain',
  async (id,thunkAPI) => {
    try {
      return await trainService.disableTrain(id)
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
      .addCase(createtrain.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createtrain.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.train = action.payload
      })
      .addCase(createtrain.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.train = null
      })
      .addCase(deletetrain.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deletetrain.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.message = action.payload
      })
      .addCase(deletetrain.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(disabletrain.pending, (state) => {
        state.isLoading = true
      })
      .addCase(disabletrain.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.message = action.payload
      })
      .addCase(disabletrain.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = trainSlice.actions
export default trainSlice.reducer