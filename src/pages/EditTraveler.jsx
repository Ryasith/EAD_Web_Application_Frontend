import React, { useState, useRef, useEffect } from "react";
import "./Styles/register.css";
// import Select from "react-select";
import axios from "axios";

function EditTraveler() {
  const [traveler, setTraveler] = useState({});

  useEffect(()=>{
    setTraveler(JSON.parse(localStorage.getItem('user')));
  },[]);

  const onChange = (e) => {
    // const { name, value } = e.target;
    // setUser({ ...user, [name]: value });

    // if (document.getElementById("role").value == "Student") {
    //   document.getElementById("spec").disabled = false;
    //   document.getElementById("lspec").disabled = false;
    //   document.getElementById("rarea").disabled = true;
    //   document.getElementById("lrarea").disabled = true;
    // } else {
    //   document.getElementById("spec").disabled = true;
    //   document.getElementById("lspec").disabled = true;
    //   document.getElementById("rarea").disabled = false;
    //   document.getElementById("lrarea").disabled = false;
    // }
  };

//   const registerSubmit = async (e) => {
//     e.preventDefault();
//     if(document.getElementById("password").value == document.getElementById("cf_password").value)
//     {
//     if(document.getElementById('role').value =="Student"){
//     try {
//       const register = await axios.post('http://localhost:8070/user/register',{...user})
//       localStorage.setItem("firstLogin", true);
//     //   swal("Done!", "Register Success! Please activate your email to start.", "success").then(() => {
//     //     window.location.href = "/login"
//     // })
//     } catch (err) {
//     //   swal("ERROR!", err.response.data.msg, "error");
//     }
//   }
//   else{
//     try {
//       const pendregister = await axios.post('http://localhost:8070/pending/register',{...user})
//     //   swal("Done!", "Register Success! Please activate your email to start.", "success").then(() => {
//     //     window.location.href = "/login"
//     // })
//     } catch (err) {
//     //   swal("ERROR!", err.response.data.msg, "error");
//     }

//   }
//   }else{
//     // swal("ERROR!", "Passwords Mismatched!", "error");
//   }
//   }

  return (
    <div className="regTop">
      <div className="container-fluid ps-md-0 ">
        <div className="row g-0">
          <div className="d-none d-md-flex col-md-4 col-lg-6 regimage"></div>
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
                          onChange={onChange}
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
                          onChange={onChange}
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
                        name="regNumber"
                        className="form-control form-control-lg"
                        onChange={onChange}
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
                        onChange={onChange}
                        value={traveler.user_Role == 3? "Traveler":"XXX"}
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
                        onChange={onChange}
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
                        value={traveler.updated}
                        className="form-control form-control-lg"
                        disabled = {true}
                      />
                  </div>
                </div>

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

export default EditTraveler;
