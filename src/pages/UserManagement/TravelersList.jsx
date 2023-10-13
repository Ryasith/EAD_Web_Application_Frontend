import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { travelerslist, reset, deleteuser, disableuser } from '../../features/user/userSlice'
import { useSelector, useDispatch } from 'react-redux'
import { MDBTable, MDBTableHead, MDBTableBody, MDBRow, MDBCol, MDBContainer, MDBBtn, MDBBtnGroup, MDBPagination, MDBPaginationItem, MDBPaginationLink} from 'mdb-react-ui-kit'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import Spinner from '../../components/Spinner'

function TravelersList() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { travelersList, isLoading } = useSelector((state) => state.user)

    useEffect(()=>{
        loadUserData();
    },[]);

  const loadUserData = async () =>{
    dispatch(travelerslist(3))
  }

  const selectTraveler = (item) => () => {
    try {
        localStorage.setItem('selectedTraveler', JSON.stringify(item));
        navigate('/editTraveler');
    } catch (error) {
        console.error('Navigation error:', error);
    }
}

const deleteTraveler = (nic) => () => {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete taveler!'
  }).then((result) => {
    if (result.isConfirmed) {
      dispatch(deleteuser(nic)).then(()=>{
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      })
    }
  });
}

const ActivateTraveler = (nic) => () => {
  Swal.fire({
    title: 'Are you sure?',
    text: "Do you really want to enable/disable this user!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Enable/Disable'
  }).then((result) => {
    if (result.isConfirmed) {
      dispatch(disableuser(nic)).then(()=>{
        Swal.fire(
          'Enabled/Disabled!',
          'The traveler has been enabled/disabled.',
          'success'
        )
      })
    }
  });
}

const handleCreate = () => {
  dispatch(reset());
  navigate("/createTraveler")
}

if (isLoading) {
  return <Spinner />
}

  return (
    <MDBContainer>
              <br/>
                <form style={{
            margin: "auto",
            padding: "15px",
            maxWidth: "500px",
            alignContent: "center",
        }}
        className='w-auto'
        >
        <h2>Create New Traveler</h2>
        <MDBBtnGroup>
                <MDBBtn className='mx-2' color='info' onClick={()=> handleCreate()}>Create</MDBBtn>
                </MDBBtnGroup>
                </form>
        <div style={{marginTop: "50px"}}>
            <h2>Travelers List</h2>
            <MDBRow>
                <MDBCol size={"12"}>
                    <MDBTable>
                        <MDBTableHead dark>
                            <tr>
                                <th scope='col'>No.</th>
                                <th scope='col'>NIC.</th>
                                <th scope='col'>Name</th>
                                <th scope='col'>Email</th>
                                <th scope='col'>User Role</th>
                                <th scope='col'>Status</th>
                                <th scope='col'>Action</th>
                            </tr>
                        </MDBTableHead>
                        {travelersList.length === 0 ?(
                        <MDBTableBody className='align-center mb-0'>
                        <tr>
                            <td colSpan={8} className='text-center mb-0'>No Users Found</td>
                        </tr>
                        </MDBTableBody>
                        ):(
                            travelersList.map((item, index)=>(
                            <MDBTableBody key={index}>
                            <tr>
                                <th scope='row'>{index+1}</th>
                                <td >{item.nic}</td>    
                                <td >{item.name}</td>
                                <td >{item.email}</td>
                                <td >{item.userRole == 3? "Traveler":"-"}</td>
                                <td >{item.isActive?"Active":"Inactive"}</td>
                                <td>
                                <MDBCol size="4">
                                <MDBBtnGroup>
                                    <MDBBtn color='success' onClick={selectTraveler(item)}>Edit</MDBBtn>
                                    &nbsp;&nbsp;
                                    <MDBBtn color='danger' onClick={deleteTraveler(item.nic)}>Delete</MDBBtn>
                                    &nbsp;&nbsp;
                                    <MDBBtn color='info' onClick={ActivateTraveler(item.nic)}>{item.isActive?"Deactivate":"Activate"}</MDBBtn>
                                </MDBBtnGroup>
                                </MDBCol>
                                </td>
                            </tr>
                            </MDBTableBody>
                        ))
                        )}

                    </MDBTable>
                </MDBCol>
            </MDBRow>
        </div>
    </MDBContainer>
  );
}

export default TravelersList
