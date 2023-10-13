import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { reservationlist, deletereservation } from '../../features/reservation/reservationSlice'
import { reset } from '../../features/train/trainSlice';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Spinner from '../../components/Spinner'
import { MDBTable, MDBTableHead, MDBTableBody, MDBRow, MDBCol, MDBContainer, MDBBtn, MDBBtnGroup, MDBPagination, MDBPaginationItem, MDBPaginationLink} from 'mdb-react-ui-kit'
import Swal from 'sweetalert2'

function ReservationList() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { reservationList, isLoading, message } = useSelector((state) => state.reservation);
    const [value, setValue] = useState("");
    const [sortValue, setSortValue] = useState("");
    const sortOptions = ["name", "email", "status"]

    useEffect(()=>{
        loadReservationData();
    },[]);

  const loadReservationData = async () =>{
    dispatch(reservationlist())
  }

  const handleCreate = () => {
    dispatch(reset());
    navigate("/createReservation")
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

  if (isLoading) {
    return <Spinner />
  }

  const selectReservation = (item) => () => {
    try {
        localStorage.setItem('selectedReservation', JSON.stringify(item));
        navigate('/editReservation');
    } catch (error) {
        console.error('Navigation error:', error);
    }
}

const cancelReservation = (id) => () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to cancel this reservation!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Cancel it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deletereservation(id)).then(()=>{
          console.log(message);
          Swal.fire(message);
        })
      }
    });
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
        <h2>Add New Reservation</h2>
        <MDBBtnGroup>
                <MDBBtn className='mx-2' color='info' onClick={()=> handleCreate()}>Create</MDBBtn>
                </MDBBtnGroup>
                </form>
        <div style={{marginTop: "50px"}}>
            <h2>Reservations List</h2>
            <MDBRow>
                <MDBCol size={"12"}>
                    <MDBTable>
                        <MDBTableHead dark>
                            <tr>
                                <th scope='col'>No.</th>
                                <th scope='col'>Reference Id</th>
                                <th scope='col'>NIC</th>
                                <th scope='col'>Passengers Count</th>
                                <th scope='col'>Date</th>
                                <th scope='col'>Depature</th>
                                <th scope='col'>Arrival</th>
                                <th scope='col'>Depature Time</th>
                                <th scope='col'>Arrival Time</th>
                                <th scope='col'>Average Time Duration</th>
                                <th scope='col'>Total Amount</th>
                                <th scope='col'>Action</th>
                            </tr>
                        </MDBTableHead>
                        {reservationList.length === 0 ?(
                        <MDBTableBody className='align-center mb-0'>
                        <tr>
                            <td colSpan={8} className='text-center mb-0'>No Reservations Found</td>
                        </tr>
                        </MDBTableBody>
                        ):(
                            reservationList.map((item, index)=>(
                            <MDBTableBody key={index}>
                            <tr>
                                <th scope='row'>{index+1}</th>
                                <td >{item.referenceId}</td>    
                                <td >{item.nic}</td>
                                <td >{item.passengersCount}</td>
                                <td >{new Date(item.date).toISOString().split('T')[0]}</td>    
                                <td >{item.depature}</td>
                                <td >{item.arrival}</td>
                                <td >{new Date(item.depatureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                                <td >{new Date(item.arrivalTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>    
                                <td >{item.averageTimeDuration}</td>
                                <td >{item.totalAmount}</td>
                                <td>
                                <MDBCol size="4">
                                <MDBBtnGroup>
                                    <MDBBtn color='success' onClick={selectReservation(item)}>Edit</MDBBtn>
                                    <MDBBtn color='danger' onClick={cancelReservation(item.id)}>Cancel</MDBBtn>
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
        {/* <MDBRow>
            <MDBCol size="8">
                <h5>Sort By:</h5>
                <select style={{width: "50%", borderRadius: "2px", height: "35px"}}
                onChange={handleSort}
                value={sortValue}
                >
                    <option>Please Select a Value</option>
                    {sortOptions.map((item,index)=>(
                        <option value={item} key={index}>{item}</option>
                    ))}
                </select>
            </MDBCol>
        </MDBRow> */}
    </MDBContainer>
  );
}

export default ReservationList
