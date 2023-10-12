import React, { useState, useRef, useEffect } from "react";
import "./Styles/register.css";
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from "axios";
import { createtraveler, reset } from '../features/auth/userSlice'
import Swal from 'sweetalert2'

function CreateTraveler() {
    const [traveler, setTraveler] = useState({
        nic: '',
        name: '',
        email: '',
        role: '',
        password: '',
        cf_password: '',
        })

        const { nic, name, email, role, password, cf_password } = traveler

        const { user, isLoading, isError, isSuccess, message } = useSelector(
            (state) => state.auth
          )
          const navigate = useNavigate()
          const dispatch = useDispatch()

        useEffect(() => {
            if (isError) {
              toast.error(message)
            }
        
            // if (isSuccess || user) {
            //   navigate('/dashboard')
            // }
        
            dispatch(reset())
          }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setTraveler((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmitReg = (e) => {
    e.preventDefault()
    if (password !== cf_password) {
      toast.error('Passwords do not match')
    } else {
      const userDataReg = {
        nic,
        name,
        email,
        role,
        password,
      }

      dispatch(createtraveler(userDataReg)).then(()=>{
        Swal.fire({
            icon: 'success',
            title: 'Done',
            text: 'Created Successfully!',
          })
          navigate('/travelersList');
      });
    }
  }

  return (
    <div className="regTop">
      <div className="container-fluid ps-md-0 ">
        <div className="row g-0">
          <div className="d-none d-md-flex col-md-4 col-lg-6 regimage"></div>
          <div className="col-md-8 col-lg-6">
            <div className="login d-flex align-items-center py-5">
              <div className="card-body p-md-5 text-black">
                <form onSubmit={onSubmitReg}>
                  <h3 className="register-heading mb-6">Create A New Traveler</h3>
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
                          onChange={onChange}
                          required
                        />
                    </div>
                    <div className="col-md-6 mb-4">
                        <label className="form-label" for="form3Example1n">
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          className="form-control form-control-lg"
                          onChange={onChange}
                          required
                        />
                    </div>
                  </div>
          

                <div className="row">
                  <div className="col-md-6 mb-4">
                    <label className="form-label" for="form3Example1m1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        className="form-control form-control-lg"
                        onChange={onChange}
                        required
                      />
                  </div>
                  <div className="col-md-6 mb-4">
                      <label className="form-label" for="form3Example1m1">
                        Role
                      </label>
                      <input
                        type="text"
                        name="role"
                        className="form-control form-control-lg"
                        onChange={onChange}
                        value={"Traveler"}
                        disabled={true}
                      />
                    </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-4">
                      <label className="form-label" for="form3Example1m">
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        onChange={onChange}
                        id="password"
                        className="form-control form-control-lg"
                        // required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
                        // title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                      />
                    </div>
                  <div className="col-md-6 mb-4">
                      <label className="form-label" for="form3Example1n">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        name="cf_password"
                        id="cf_password"
                        className="form-control form-control-lg"
                        required
                        onChange={onChange}
                      />
                  </div>
                </div>

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

export default CreateTraveler;
