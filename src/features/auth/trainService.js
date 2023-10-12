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

const trainService = {
    TrainList,
    availableTrains,
}

export default trainService