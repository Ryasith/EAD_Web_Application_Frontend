import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Spinner from '../../components/Spinner'
import { reset } from '../../features/train/trainSlice';
import { MDBTable, MDBTableHead, MDBTableBody, MDBRow, MDBCol, MDBContainer, MDBBtn, MDBBtnGroup, MDBPagination, MDBPaginationItem, MDBPaginationLink} from 'mdb-react-ui-kit'

function AvailableTrainsList() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, availableTrains } = useSelector((state) => state.trains);
    const [value, setValue] = useState("");

const handleBackButtonPress = () => {
    dispatch(reset());
    navigate("/createReservation");
  };

window.addEventListener('popstate', handleBackButtonPress);

useEffect(() => {
    return () => {
      window.removeEventListener('popstate', handleBackButtonPress);
    };
  }, []);

  if (isLoading) {
    return <Spinner />
  }

    const selectTrain = (item) => () => {
        try {
            localStorage.setItem('selectedTrain', JSON.stringify(item));
            navigate('/addReservation');
        } catch (error) {
            console.error('Navigation error:', error);
        }
    }

  return (
    <MDBContainer>
        <div style={{marginTop: "50px"}}>
            <h2>Available Trains</h2>
            {/* <h3>{resevationObj.departure +">"+resevationObj.arrival}</h3> */}
            <MDBRow>
                <MDBCol size={"12"}>
                    <MDBTable>
                        <MDBTableHead dark>
                            <tr>
                                <th scope='col'>No.</th>
                                <th scope='col'>Train Name</th>
                                <th scope='col'>Depature</th>
                                <th scope='col'>Arrival</th>
                                <th scope='col'>Depature Time</th>
                                <th scope='col'>Arrival Time</th>
                                <th scope='col'>Trip Time Duration</th>
                                <th scope='col'>Requested Seat Count</th>
                                <th scope='col'>Available Seat Count</th>
                                <th scope='col'>Amount</th>
                                <th scope='col'>Action</th>
                            </tr>
                        </MDBTableHead>
                        {availableTrains.length === 0 ?(
                        <MDBTableBody className='align-center mb-0'>
                        <tr>
                            <td colSpan={8} className='text-center mb-0'>No Trains Found</td>
                        </tr>
                        </MDBTableBody>
                        ):(
                            availableTrains.map((item, index)=>(
                            <MDBTableBody key={index}>
                            <tr>
                                <th scope='row'>{index+1}</th>
                                <td >{item.trainName}</td>    
                                <td >{item.departure}</td>
                                <td >{item.arrival}</td>
                                <td >{item.departureTime}</td>    
                                <td >{item.arrivalTime}</td>
                                <td >{item.tripTimeDuration}</td>
                                <td >{item.requestedSeatCount}</td>
                                <td >{item.availableSeatCount}</td>    
                                <td >{item.amount}</td>
                                <td>
                                <MDBCol size="4">
                                <MDBBtnGroup>
                                    <MDBBtn color='success' onClick={selectTrain(item)}>Select</MDBBtn>
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

export default AvailableTrainsList
