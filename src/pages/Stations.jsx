import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from 'react-icons/fa';

const Stations = ({ stations: initialStations }) => {
    const [stations, setStations] = useState(initialStations);
    const [newStation, setNewStation] = useState({ stationName: '', time: '' });
    const [startDate, setStartDate] = useState(new Date());

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
                    <input
                        className="form-control form-control-lg"
                        type="text"
                        placeholder="Station Name"
                        value={newStation.stationName}
                        onChange={(e) => setNewStation({ ...newStation, stationName: e.target.value })}
                    />
                </div>
                <div className="col-md-6 mb-4">
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
