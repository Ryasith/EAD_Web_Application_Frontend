import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userService from './userService'

const initialState = {
  userList:  [],
  travelersList:  [],
  user: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// All users
export const userlist = createAsyncThunk(
  'users/userList',
  async (thunkAPI) => {
    try {
      return await userService.userList()
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

// All travelers
export const travelerslist = createAsyncThunk(
  'users/travelersList',
  async (userRole,thunkAPI) => {
    try {
      return await userService.travelersList(userRole)
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

// Delete By NIC
export const deleteuser = createAsyncThunk(
  'users/deleteuser',
  async (nic,thunkAPI) => {
    try {
      return await userService.deleteUser(nic)
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

// disable User
export const disableuser = createAsyncThunk(
  'users/disableuser',
  async (nic,thunkAPI) => {
    try {
      return await userService.disableUser(nic)
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

// Create Traveler
export const createtraveler = createAsyncThunk(
  'users/createTraveler',
  async (user, thunkAPI) => {
    try {
      return await userService.createTraveler(user)
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

export const userSlice = createSlice({
  name: 'user',
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
      .addCase(userlist.pending, (state) => {
        state.isLoading = true
      })
      .addCase(userlist.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.userList = action.payload
      })
      .addCase(userlist.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.userList = []
      })
      .addCase(travelerslist.pending, (state) => {
        state.isLoading = true
      })
      .addCase(travelerslist.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.travelersList = action.payload
      })
      .addCase(travelerslist.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.travelersList = []
      })
      .addCase(deleteuser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteuser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.message = action.payload
      })
      .addCase(deleteuser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(disableuser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(disableuser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.message = action.payload
      })
      .addCase(disableuser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(createtraveler.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createtraveler.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.message = action.payload
      })
      .addCase(createtraveler.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = userSlice.actions
export default userSlice.reducer