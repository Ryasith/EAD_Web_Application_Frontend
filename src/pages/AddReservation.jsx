import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom"
import {checkoutResevation, isSuccess, isLoading, isError} from '../features/auth/reservationSlice'
import Spinner from '../components/Spinner'
import Swal from 'sweetalert2'

function AddReservation() {

  const [train, setTrain] = useState({})
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector(
    (state) => state.auth
  )
  let checkoutObj = {
    referenceId: '',
    nic: '',
    trainId: '',
    passengersCount: 0,
    date: '',
    departure: '',
    arrival: '',
    depatureTime: '',
    arrivalTime: '',
    averageTimeDuration: '',
    totalAmount: '',
    createdAt: '',
    updatedAt: ''
}
const {isLoading, isSuccess, message} = useSelector((state)=>state.reservation)

  useEffect(()=>{
    checkoutObj = {
      referenceId: ""+Date.now() + Math.floor(Math.random() * 1000),
      nic: user.nic,
      trainId: train.trainId,
      passengersCount: train.requestedSeatCount,
      // date: "2023-10-09T04:41:29.110Z",
      departure: train.departure,
      arrival: train.arrival,
      depatureTime: train.departureTime,
      arrivalTime: train.arrivalTime,
      averageTimeDuration: "1",
      totalAmount: train.amount,
      // createdAt: "2023-10-09T04:41:29.110Z",
      // updatedAt: "2023-10-09T04:41:29.110Z"
  }
  },[train])

  useEffect(()=>{
    setTrain(JSON.parse(localStorage.getItem('selectedTrain')));
  },[])

  const onCheckout = () => {
    var refID = Date.now() + Math.floor(Math.random() * 1000);
    dispatch(checkoutResevation(checkoutObj)).then(()=>{
    if (isSuccess){
      Swal.fire({
        icon: 'success',
        title: 'DONE...!',
        text: 'Created Reservation successfully!',
      })
    }
    navigate('/reservationList');
    });
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <div className='container grid3'>
      <div className='box boxItems' id='product'>
        <h3>{train.trainName}</h3>
        <div className='img'>
          <Link>
            <img src="../images/cardImages/train.png" alt='cover' />
          </Link>
        </div>
        <div className='details'>
          <p>Available Seat Count{" = "+train.availableSeatCount}</p>
        </div>
      </div>
      <div className='box boxItems' id='product'>
        <h3>Summary</h3>
        <hr/>
        <div className='details'>
          <p>Start Station&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "+train.departure}</p>
          <p>End Station&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "+train.departure}</p>
          <p>Departure Date&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "+train.departureTime?.split("T")[0]}</p>
          <p>Time Start - End&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "+train.departureTime?.split("T")[1].slice(0, -1)+" - "+train.arrivalTime?.split("T")[1].slice(0, -1)}</p>
          <p>No of Passengers&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{train.requestedSeatCount}</p>
          <hr/>
          <p>Amount&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" LKR "+train.amount}</p>
            <div className="d-flex justify-content-center pt-3">
              <button
                className="btn btn-lg btn-warning btn-login text-uppercase fw-bold mb-5"
                type="submit"
                onClick={onCheckout}
              >
                Checkout
              </button>
            </div>
          </div>
      </div>
      </div>
    </>
  )
}

export default AddReservation
