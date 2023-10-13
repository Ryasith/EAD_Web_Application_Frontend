import React, { useState, useRef, useEffect } from "react";
import "../Styles/register.css";
// import Select from "react-select";
import axios from "axios";
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { updatetraveler } from '../../features/user/userSlice'

function EditTraveler() {
  const [traveler, setTraveler] = useState({});
  const [name , setName] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const travelerObj = {
    name: name,
    email: email,
}

  useEffect(()=>{
    setTraveler(JSON.parse(localStorage.getItem('selectedTraveler')));
  },[]);

  const { isLoading, message } = useSelector(
    (state) => state.user
  )

  const UpdateTraveler = (e) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to update this traveler!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Update it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(updatetraveler(traveler.nic,travelerObj)).then(()=>{
          Swal.fire(message);
          // navigate("/availableTrains");
        })
      }
    });
  }

  return (
    <div className="regTop">
      <div className="container-fluid ps-md-0 ">
        <div className="row g-0">
          <div className="d-none d-md-flex col-md-4 col-lg-6 edittravimage"></div>
          <div className="col-md-8 col-lg-6">
            <div className="login d-flex align-items-center py-5">
              <div className="card-body p-md-5 text-black">
                <form 
                // onSubmit={registerSubmit}
                >
                  <h3 className="register-heading mb-6">Edit Traveler Info</h3>
                  <hr className="hr1" />
                  <br />

                  <div className="row">
                    <div className="col-md-6 mb-4">
                        <label className="form-label" for="form3Example1m">
                          NIC Number
                        </label>
                        <input
                          type="text"
                          name="nic"
                          className="form-control form-control-lg"
                          disabled
                          value={traveler.nic}
                          required
                        />
                    </div>
                    <div className="col-md-6 mb-4">
                        <label className="form-label" for="form3Example1m">
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          className="form-control form-control-lg"
                          onChange={(e) => setName(e.target.value)}
                          value={traveler.name}
                          required
                        />
                    </div>
                  </div>
          

                <div className="row">
                  <div className="col-md-6 mb-4">
                    <label className="form-label" for="form3Example1m1">
                        Email
                      </label>
                      <input
                        type="text"
                        name="email"
                        className="form-control form-control-lg"
                        onChange={(e) => setEmail(e.target.value)}
                        value={traveler.email}
                        required
                      />
                  </div>
                  <div className="col-md-6 mb-4">
                    <label className="form-label" for="form3Example1m1">
                        User Role
                      </label>
                      <input
                        type="text"
                        name="role"
                        className="form-control form-control-lg"
                        disabled
                        value={traveler.userRole == 3? "Traveler":"-"}
                        required
                      />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-4">
                      <label className="form-label" for="form3Example1m">
                        Active Status
                      </label>
                      <input
                        type="text"
                        name="active"
                        disabled
                        value={traveler.isActive?"Active":"Inactive"}
                        id="active"
                        className="form-control form-control-lg"
                      />
                  </div>
                  <div className="col-md-6 mb-4">
                      <label className="form-label" for="form3Example1n">
                        Last Updated At
                      </label>
                      <input
                        type="text"
                        name="updated"
                        id="updated"
                        value={traveler?.updatedAt?.split('T')[0]+" at "+traveler?.updatedAt?.split('T')[1].split('.')[0]}
                        className="form-control form-control-lg"
                        disabled = {true}
                      />
                  </div>
                </div>

                  <div className="d-flex justify-content-center pt-3">
                    <button
                      className="btn btn-lg btn-warning btn-login text-uppercase fw-bold mb-5"
                      type="submit"
                      onClick={UpdateTraveler}
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

export default EditTraveler;
