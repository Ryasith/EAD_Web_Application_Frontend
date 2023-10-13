import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from 'react-icons/fa';

const Stations = ({ stations: initialStations }) => {
    const [stations, setStations] = useState(initialStations);
    const [newStation, setNewStation] = useState({ stationName: '', time: '' });
    const [startDate, setStartDate] = useState(new Date());

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

    const handleStationChange = (e) => {
        setNewStation({ ...newStation, stationName: e.target.value })
    };

    return (
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
    );
};

export default Stations;
