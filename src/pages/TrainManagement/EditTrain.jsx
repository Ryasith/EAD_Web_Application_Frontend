import React, { useState, useRef, useEffect } from "react";
import "../Styles/register.css";
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { updatetrain } from '../../features/train/trainSlice'
import Swal from 'sweetalert2'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt, FaDumpster } from 'react-icons/fa';
import { MdOutlineDeleteForever } from 'react-icons/md'

function EditTrain() {

  const [trainName, setTrainName] = useState("");
  const [seatCount, setSeatCount] = useState("");
  const [trainType, setTrainType] = useState("");
  const [price, setPrice] = useState("");
  const [stations, setStations] = useState("");
  const [newStation, setNewStation] = useState({ stationName: '', time: '' });
  const [startDate, setStartDate] = useState(new Date());
  const [trainID, setTrainID] = useState("")

  const newTrainObj = {
    trainName: trainName,
    seatCount: seatCount,
    trainTypesDetails: {
      trainType: trainType,
      price: price,
    },
    stations: [stations],
  }

  useEffect(()=>{
    const train = (JSON.parse(localStorage.getItem('selectedTrain')));
    setTrainID(train.id)
    setTrainName(train.trainName);
    setSeatCount(train.seatCount);
    setTrainType(train.trainTypesDetails.trainType);
    setPrice(train.trainTypesDetails.price);
    setStations(train.stations);
  },[]);

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

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handletypeChange = (e) => {
    const selectedOption = e.target.value;
    setTrainType(selectedOption);
  };

  const onSubmitUpdate = (e) => {
    e.preventDefault()

    dispatch(updatetrain(trainID,newTrainObj)).then(()=>{
      Swal.fire({
          icon: 'success',
          title: 'Done',
          text: 'Successfully Updated!',
        })
        navigate('/trainList');
    });
  }

  const removeStation = (index) => {
    const updatedStations = [...stations];
    updatedStations.splice(index, 1);
    setStations(updatedStations);
  };

  return (
    <div className="regTop">
      <div className="container-fluid ps-md-0 ">
        <div className="row g-0">
          <div className="d-none d-md-flex col-md-4 col-lg-6 edittrainimage"></div>
          <div className="col-md-8 col-lg-6">
            <div className="login d-flex align-items-center py-5">
              <div className="card-body p-md-5 text-black">
                <form onSubmit={onSubmitUpdate}>
                  <h3 className="register-heading mb-6">Update Train</h3>
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
                        onChange={(e) => setTrainName(e.target.value)}
                        value={trainName}
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
                        onChange={(e) => setSeatCount(e.target.value)}
                        value={seatCount}
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
                              <label>Station Name: {station.stationName}</label>&nbsp;&nbsp;&nbsp;&nbsp;
                              <span> | </span>&nbsp;&nbsp;&nbsp;&nbsp;
                              <label>Time: {station.time}</label>&nbsp;&nbsp;&nbsp;&nbsp;
                              <Link><MdOutlineDeleteForever color="red" onClick={() => removeStation(index)}></MdOutlineDeleteForever></Link>
                              <hr></hr>
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
                  <hr />
                  <div className="d-flex justify-content-center pt-3">
                    <button
                      className="btn btn-lg btn-warning btn-login text-uppercase fw-bold mb-5"
                      type="submit"
                    >
                      Update
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

export default EditTrain;
