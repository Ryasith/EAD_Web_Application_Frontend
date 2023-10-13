import axios from 'axios'

const API_URL = 'http://localhost:8086/api/Train'

// Trains List
const TrainList = async () => {
  const response = await axios.get(API_URL)

  return response.data
}

// Available Trains
const availableTrains = async (resevationObj) => {
  const response = await axios.post(API_URL+"/search",resevationObj)

  return response.data
}

// Create train
const createTrain = async (trainData) => {
  const response = await axios.post(API_URL, trainData)

  return response.data
}

// Delete train by id
const deleteTrain = async (id) => {
  const response = await axios.delete(API_URL+"/"+id)

  return response.data
}

// Disable train by id
const disableTrain = async (id) => {
  const response = await axios.patch(API_URL+"/active_deactive/"+id)

  return response.data
}

const trainService = {
    TrainList,
    availableTrains,
    createTrain,
    deleteTrain,
    disableTrain,
}

export default trainService