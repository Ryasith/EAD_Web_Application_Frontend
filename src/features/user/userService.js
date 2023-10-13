import axios from 'axios'

const API_URL = 'http://localhost:8086/api/User'

// users list
const userList = async (userData) => {
  const response = await axios.get(API_URL)

  return response.data
}

// users list by role
const travelersList = async (userRole) => {
  const response = await axios.get(API_URL+"/getbyRole/"+userRole)

  return response.data
}

// Delete users by nic
const deleteUser = async (nic) => {
  const response = await axios.delete(API_URL+"/"+nic)

  return response.data
}

// Disable users by nic
const disableUser = async (nic) => {
  const response = await axios.patch(API_URL+"/active_deactive/"+nic)

  return response.data
}

// Register user
const createTraveler = async (userData) => {
  const response = await axios.post(API_URL, userData)

  return response.data
}

// update traveler by nic
const updateTraveler = async (nic,travelerObj) => {
  const response = await axios.put(API_URL+"/"+nic,travelerObj)

  return response.data
}

const userService = {
    userList,
    travelersList,
    deleteUser,
    disableUser,
    createTraveler,
    updateTraveler,
}

export default userService