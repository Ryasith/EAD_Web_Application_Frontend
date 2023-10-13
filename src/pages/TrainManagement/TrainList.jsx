import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { MDBTable, MDBTableHead, MDBTableBody, MDBRow, MDBCol, MDBContainer, MDBBtn, MDBBtnGroup, MDBPagination, MDBPaginationItem, MDBPaginationLink} from 'mdb-react-ui-kit'
import { useNavigate } from 'react-router-dom'
import Spinner from '../../components/Spinner'
import Swal from 'sweetalert2'
import {alltrains, deletetrain, disabletrain, reset} from '../../features/train/trainSlice'

function TrainList() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { allTrains, isLoading } = useSelector((state) => state.trains)

    useEffect(()=>{
        loadUserData();
    },[]);

  const loadUserData = async () =>{
    dispatch(alltrains());
  }

  const handleReset = () => {
    //------to-do-----------------
  }

  const handleSearch = async (e) => {
    e.preventDefault();
    //------to-do-----------------
  }

  const handleSort = async (e) => {
    e.preventDefault();
    //------to-do-----------------
  }

  const handleFilter = async (e) => {
    e.preventDefault();
    //------to-do-----------------
  }

  const selectTrain = (item) => () => {
    try {
        localStorage.setItem('selectedTraveler', JSON.stringify(item));
        navigate('/editTraveler');
    } catch (error) {
        console.error('Navigation error:', error);
    }
}

const deleteTrain = (id) => () => {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      dispatch(deletetrain(id)).then(()=>{
        Swal.fire(
          'Deleted!',
          'The Train has been removed.',
          'success'
        )
      })
    }
  });
}

const ActivateTrain = (id) => () => {
  Swal.fire({
    title: 'Are you sure?',
    text: "Do you really want to enable/disable this train!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Enable/Disable'
  }).then((result) => {
    if (result.isConfirmed) {
      dispatch(disabletrain(id)).then(()=>{
        Swal.fire(
          'Enabled/Disabled!',
          'The train has been enabled/disabled.',
          'success'
        )
      })
    }
  });
}

const handleCreate = () => {
  dispatch(reset());
  navigate("/createTrain")
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
        onSubmit={handleSearch}
        >
        <h2>Create New Trains</h2>
        <MDBBtnGroup>
                <MDBBtn className='mx-2' color='info' onClick={()=> handleCreate()}>Create</MDBBtn>
                </MDBBtnGroup>
                </form>
        <div style={{marginTop: "50px"}}>
            <h2>Trains List</h2>
            <MDBRow>
                <MDBCol size={"12"}>
                    <MDBTable>
                        <MDBTableHead dark>
                            <tr>
                                <th scope='col'>No.</th>
                                <th scope='col'>Train Name</th>
                                <th scope='col'>Seat Count</th>
                                <th scope='col'>Train Type/Price</th>
                                <th scope='col'>Stations</th>
                                <th scope='col'>Status</th>
                                <th scope='col'>Action</th>
                            </tr>
                        </MDBTableHead>
                        {allTrains?.length === 0 ?(
                        <MDBTableBody className='align-center mb-0'>
                        <tr>
                            <td colSpan={8} className='text-center mb-0'>No Users Found</td>
                        </tr>
                        </MDBTableBody>
                        ):(
                            allTrains?.map((item, index)=>(
                                <MDBTableBody key={index}>
                                    <tr>
                                        <th scope='row'>{index + 1}</th>
                                        <td >{item.trainName}</td>
                                        <td >{item.seatCount}</td>
                                        <td >{item.trainTypesDetails.trainType}</td>
                                        <td>
                                            {item.stations.map((station, stationIndex) => (
                                                <span key={stationIndex}>
                                                    {station.stationName} {/* Assuming "name" is the property for station names */}
                                                    {stationIndex < item.stations.length - 1 ? ', ' : ''}
                                                </span>
                                            ))}
                                        </td>
                                        <td >{item.isActive ? "Active" : "Inactive"}</td>
                                        <td>
                                            <MDBCol size="4">
                                                <MDBBtnGroup>
                                    <MDBBtn color='success' onClick={selectTrain(item)}>Edit</MDBBtn>
                                    &nbsp;&nbsp;
                                    <MDBBtn color='danger' onClick={deleteTrain(item.id)}>Delete</MDBBtn>
                                    &nbsp;&nbsp;
                                    <MDBBtn color='info' onClick={ActivateTrain(item.id)}>{item.isActive?"Deactivate":"Activate"}</MDBBtn>
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

export default TrainList
