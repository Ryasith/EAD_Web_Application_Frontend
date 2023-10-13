import React, { useState, useRef, useEffect } from "react";
import "../Styles/register.css";
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from "axios";
import { createtrain, disabletrain, deletetrain, reset } from '../../features/train/trainSlice'
import Swal from 'sweetalert2'
import Stations from './Stations';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from 'react-icons/fa';

function CreateTrains() {
    const [newTrain, setNewTrain] = useState({
        trainName: '',
        seatCount: '',
        trainTypesDetails: {
            trainType: '',
            price: '',
        },
        stations: [],
        })
        const [trainType, setTrainType] = useState("");
        const [price, setPrice] = useState("");
        const [stations, setStations] = useState("");
        const [newStation, setNewStation] = useState({ stationName: '', time: '' });
        const [startDate, setStartDate] = useState(new Date());

        const traintype = [
          "Express",
          "Commuter",
          "InterCity"]

          const StationsList = [
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

        const addStation = () => {
          setStations([...stations, newStation]);
          setNewStation({ stationName: '', time: '' });
      };

      const handleStationChange = (e) => {
        setNewStation({ ...newStation, stationName: e.target.value })
    };
  
      function CustomInput({ value, onClick }) {
          return (
              <div className='input-group'>
                  <input type='text' className='form-control' value={value} onClick={onClick} readOnly />
                  <div className='input-group-append'>
                      <span className='input-group-text'>
                          <FaCalendarAlt />
                      </span>
                  </div>
              </div>
          )
      }

        // const { nic, name, email, role, password, cf_password } = newTrain

        // const { user, isLoading, isError, isSuccess, message } = useSelector(
        //     (state) => state.auth
        //   )
          const navigate = useNavigate()
          const dispatch = useDispatch()

        // useEffect(() => {
        //     if (isError) {
        //       toast.error(message)
        //     }
        
        //     // if (isSuccess || user) {
        //     //   navigate('/dashboard')
        //     // }
        
        //     dispatch(reset())
        //   }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setNewTrain((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const handletypeChange = (e) => {
    const selectedOption = e.target.value;
    setTrainType(selectedOption);
  };

  const onSubmitCreate = (e) => {
    e.preventDefault()
      // const userDataReg = {
      //   nic,
      //   name,
      //   email,
      //   role,
      //   password,
      // }
      console.log(newTrain);

      // dispatch(createtrain(userDataReg)).then(()=>{
      //   Swal.fire({
      //       icon: 'success',
      //       title: 'Done',
      //       text: 'Created Successfully!',
      //     })
      //     navigate('/travelersList');
      // });
  }

  return (
    <div className="regTop">
      <div className="container-fluid ps-md-0 ">
        <div className="row g-0">
          <div className="d-none d-md-flex col-md-4 col-lg-6 trainEditimage"></div>
          <div className="col-md-8 col-lg-6">
            <div className="login d-flex align-items-center py-5">
              <div className="card-body p-md-5 text-black">
                <form onSubmit={onSubmitCreate}>
                  <h3 className="register-heading mb-6">Create A New Train</h3>
                  <hr className="hr1" />
                  <br />

                  <div className="row">
                    <div className="col-md-6 mb-1">
                        <label className="form-label" for="form3Example1m">
                          Train Name
                        </label>
                        <input
                          type="text"
                          name="trainName"
                          className="form-control form-control-lg"
                          onChange={onChange}
                          required
                        />
                    </div>
                    <div className="col-md-6 mb-1">
                        <label className="form-label" for="form3Example1n">
                          Seat Count
                        </label>
                        <input
                          type="text"
                          name="seatCount"
                          className="form-control form-control-lg"
                          onChange={onChange}
                          required
                        />
                    </div>
                  </div>

                <div className="row">
                <div className="row">
      <div className="col-md-6 mb-1">
        <label className="form-label" for="form3Example1m1">Train Type</label>
        <select name="trainType" id="trainType" class="form-select" aria-label="Default select example" value={trainType} onChange={handletypeChange}     >
          <option selected value="">Choose Train Type</option>
          {traintype.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="col-md-6 mb-1">
        <label className="form-label" for="form3Example1m1">Ticket Price</label>
        <input
          type="number"
          value={price}
          className="form-control form-control-lg"
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
    </div>
    <div>
            <h2>Stations</h2>
            <hr />
            <ul>
                {stations.length > 0 ?
                    stations.map((station, index) => (
                        <li key={index}>
                            <p>Station Name: {station.stationName}</p>
                            <p>Time: {station.time}</p>
                        </li>
                    )) :
                    <p>No Stations Added</p>
                }
            </ul>
            <div className="row">
                <div className="col-md-6 mb-4">
                    <label className="form-label" for="form3Example1m1">Station</label>
                    <select name="stationName" id="stationName" class="form-select" aria-label="Default select example" value={newStation.stationName} onChange={handleStationChange}     >
                        <option selected value="">Choose Station</option>
                        {StationsList.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="col-md-6 mb-4">
                    <label className="form-label" for="form3Example1m1">Time</label>
                    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} customInput={<CustomInput />} />
                </div>
                <div className="d-flex justify-content-center pt-3">
                    <button
                        className="btn btn-lg btn-warning btn-login text-uppercase fw-bold mb-5"
                        type="submit"
                        onClick={addStation}
                    >
                        Add Station
                    </button>
                </div>
            </div>
        </div>
                </div>
                <hr/>
                  <div className="d-flex justify-content-center pt-3">
                    <button
                      className="btn btn-lg btn-warning btn-login text-uppercase fw-bold mb-5"
                      type="submit"
                    >
                      Create
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateTrains;
