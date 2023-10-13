import React, {useState, useEffect} from 'react'
import "../Styles/TrainTicketCard.css"; // You'll need to create the CSS file for styling
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { availableTrains } from '../../features/train/trainSlice'
import { updatereservation } from '../../features/reservation/reservationSlice'
import Spinner from '../../components/Spinner'
import Swal from 'sweetalert2'

const EditReservation = (props) => {
  const [startDate, setStartDate] = useState(new Date());
  const [fromOption, setFromOption] = useState('');
  const [toOption, setToOption] = useState('');
  const [seatCount, setSeatCount] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reservationObj = {
        departure: fromOption,
        arrival: toOption,
        seatCount: seatCount,
        date: startDate.toDateString
  }

  const { isLoading, message } = useSelector(
    (state) => state.reservation
  )

    // Calculate the minimum and maximum allowed dates
    const today = new Date();
    const minDate = today;
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 30);

  const stations = [
    "Ahangama",
    "Aluthgama",
    "Ambalangoda",
    "Ambewela",
    "Anuradhapura",
    "Anuradhapura Town",
    "Avissawella",
    "Badulla",
    "Bandarawela",
    "Batticaloa",
    "Beliatta",
    "Bentota",
    "Beruwala",
    "China bay",
    "Chunnakam",
    "Colombo Fort",
    "Demodara-Ella",
    "Diyathalawa",
    "Ella",
    "Eraur",
    "Galgamuwa",
    "Galle",
    "Galoya",
    "Gampaha",
    "Gampola",
    "Habaraduwa",
    "Habarana",
    "Hali Ela",
    "Haputhale",
    "Hatton",
    "Hikkaduwa",
    "Hingurakgoda",
    "Jaffna",
    "Kakirawa",
    "Kalutara South",
    "Kamburugamuwa",
    "Kandy",
    "Kankesanthurai",
    "Kanthale",
    "Kilinochchi",
    "Kodikamam",
    "Koggala",
    "Kurunegala",
    "Madhupara",
    "Mahawa",
    "Makumbura",
    "Mannar",
    "Maradhana",
    "Matale",
    "Matara",
    "Medawachchiya",
    "Mirigama",
    "Mirissa",
    "Moratuwa",
    "Mount Lavinia",
    "NAGOLLAGAMA",
    "Nanu Oya",
    "Nawalapitiya",
    "Nawalapitya",
    "Nugegoda",
    "Omantha",
    "Pallai",
    "Panadura",
    "Peradeniya",
    "Polgahawela",
    "Polonnaruwa",
    "Puwakpitiya",
    "Ragama",
    "Rambukkana",
    "Rathmalana",
    "Return Colombo",
    "Return Waga",
    "Talaimannar Pier",
    "Thambalagamuwa",
    "Thambuththegama",
    "Thandikulam",
    "Trincomalee",
    "Unawatuna",
    "Valachchena",
    "Vauniya",
    "Veyangoda",
    "Waduwwa",
    "Weligama",
    "Welikanda",
    "Wellawa",
    "Wellawatte",
  ];

  const [reservation, setReservation] = useState({});

  useEffect(()=>{
    setReservation(JSON.parse(localStorage.getItem('selectedReservation')));
  },[]);

  useEffect(()=>{
    setFromOption(reservation.depature);
    setToOption(reservation.arrival);
    setSeatCount(reservation.passengersCount);
  },[reservation]);

  // useEffect(()=>{
  //   if(isSuccess){
  //     navigate("/availableTrains");
  //   }
  // },[isSuccess])

  function CustomInput({value,onClick}){
    return(
        <div className='input-group'>
            <input type='text' className='form-control' value={value} onClick={onClick} readOnly/>
            <div className='input-group-append'>
                <span className='input-group-text'>
                    <FaCalendarAlt/>
                </span>
            </div>
        </div>
    )
  }

  const handleFromChange = (e) => {
    const selectedOption = e.target.value;
    setFromOption(selectedOption);
    setToOption((prevToOption) =>
      prevToOption === selectedOption ? '' : prevToOption
    );
  };

  const UpdateReservation = (e) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to update this reservation!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Update it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(updatereservation(reservation.id,reservationObj)).then(()=>{
          Swal.fire(message);
          // navigate("/availableTrains");
        })
      }
    });
  }

  const handleToChange = (e) => {
    const selectedOption = e.target.value;
    setToOption(selectedOption);
    setFromOption((prevFromOption) =>
      prevFromOption === selectedOption ? '' : prevFromOption
    );
  };

  if (isLoading) {
    return <Spinner />
  }

  
  // if (isSuccess) {
  //   navigate("/availableTrains")
  // }

  return (
    <div className="page-background">
    <br/>
    <div className="train-ticket-card">
      <div className="left-side">
        <h2>Update Reservation</h2>
      </div>
      <div className="right-side">
      <div className="row">
                    <div className="col-md-6 mb-4">
                        <label className="form-label" for="form3Example1m">
                            Departure
                        </label>
                          <select name="role" id="role" class="form-select" aria-label="Default select example" value={fromOption} onChange={handleFromChange} >
                              <option selected value="">Choose Station</option>
                              {stations.map((option) => (
                                  <option key={option} value={option} disabled={toOption === option}>
                                      {option}
                                  </option>
                              ))}
                          </select>
                      </div>
                    <div className="col-md-6 mb-4">
                        <label className="form-label" for="form3Example1n">
                         Arrival
                        </label>
                        <select name="role" id="role" class="form-select" aria-label="Default select example" value={toOption} onChange={handleToChange}     >
                        <option selected value="">Choose Station</option>   
                        {stations.map((option) => (
                                  <option key={option} value={option} disabled={fromOption === option}>
                                      {option}
                                  </option>
                              ))}
                      </select>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-4">
                        <label className="form-label" for="form3Example1m">
                          No of Passengers
                        </label>
                        <input
                          type="number"
                          name="seatCount"
                          className="form-control input-group"
                          onChange={(e) => setSeatCount(e.target.value)}
                          value={seatCount}
                          required
                        />
                      </div>
                    <div className="col-md-6 mb-4">
                        <label className="form-label" for="form3Example1n">
                          Date
                        </label>
                        <div>
                        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} minDate={minDate} maxDate={maxDate} customInput={<CustomInput/>} />
                        </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-end pt-3">
                    <button
                      className="btn btn-lg btn-warning btn-login text-uppercase fw-bold mb-5"
                      type="submit"
                      onClick={UpdateReservation}
                    >
                      Update
                    </button>
                    {/* <button
                      className="btn btn-lg btn-warning btn-login text-uppercase fw-bold mb-5 mx-2"
                      type="submit"
                    >
                      Reset
                    </button> */}
                  </div>
      </div>
    </div>
    </div>
  );
};

export default EditReservation;
