import axios from 'axios'

const API_URL = 'http://localhost:8086/api/Reservation'

// reservation List
const reservationList = async () => {
  const response = await axios.get(API_URL)

  return response.data
}

// Checkout reservation
const checkoutResevation = async (checkoutObj) => {
  const response = await axios.post(API_URL,checkoutObj)

  return response.data
}

// reservation by id
const getReservation = async (id) => {
  const response = await axios.get(API_URL+"/"+id)

  return response.data
}

// update reservation by id
const updateReservation = async (id,reservationObj) => {
  const response = await axios.put(API_URL+"/"+id,reservationObj)

  return response.data
}

// Delete reservation by id
const deleteReservation = async (id) => {
  const response = await axios.delete(API_URL+"/"+id)

  return response.data
}

const reservationService = {
    reservationList,
    checkoutResevation,
    getReservation,
    updateReservation,
    deleteReservation,
}

export default reservationService