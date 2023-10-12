import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { userlist, reset } from '../features/auth/userSlice'
import { useSelector, useDispatch } from 'react-redux'
import { MDBTable, MDBTableHead, MDBTableBody, MDBRow, MDBCol, MDBContainer, MDBBtn, MDBBtnGroup, MDBPagination, MDBPaginationItem, MDBPaginationLink} from 'mdb-react-ui-kit'
import Spinner from '../components/Spinner'

function UserList() {

    const dispatch = useDispatch()
    const { userList } = useSelector((state) => state.user)
    const [value, setValue] = useState("");
    const [sortValue, setSortValue] = useState("");
    const sortOptions = ["name", "email", "status"]

    useEffect(()=>{
        loadUserData();
    },[]);

  const loadUserData = async () =>{
    dispatch(userlist())
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

  if (isLoading) {
    return <Spinner />
  }

  return (
    <MDBContainer>
        <form style={{
            margin: "auto",
            padding: "15px",
            maxWidth: "400px",
            alignContent: "center",
        }}
        className='w-auto'
        onSubmit={handleSearch}
        >
            <input
            type='text'
            className='form-control'
            placeholder='Search ... '
            value={value}
            onChange={(e) => setValue(e.target.value)}
            />
            <MDBBtnGroup>
                <MDBBtn type='submit' color='dark'>Search</MDBBtn>
                <MDBBtn className='mx-2' color='info' onClick={()=> handleReset()}>Reset</MDBBtn>
            </MDBBtnGroup>
        </form>
        <div style={{marginTop: "100px"}}>
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
                            </tr>
                        </MDBTableHead>
                        {userList.length === 0 ?(
                        <MDBTableBody className='align-center mb-0'>
                        <tr>
                            <td colSpan={8} className='text-center mb-0'>No Users Found</td>
                        </tr>
                        </MDBTableBody>
                        ):(
                        userList.map((item, index)=>(
                            <MDBTableBody key={index}>
                            <tr>
                                <th scope='row'>{index+1}</th>
                                <td >{item.nic}</td>    
                                <td >{item.name}</td>
                                <td >{item.email}</td>
                                <td >{item.userRole}</td>
                                <td >{item.isActive?"Active":"Inactive"}</td>
                            </tr>
                            </MDBTableBody>
                        ))
                        )}

                    </MDBTable>
                </MDBCol>
            </MDBRow>
        </div>
        <MDBRow>
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
            <MDBCol size="4"><h5>Filter By Status:</h5>
            <MDBBtnGroup>
                <MDBBtn color='success' onClick={()=> handleFilter("Active")}>Active</MDBBtn>
                <MDBBtn color='danger' style={{marginLeft: "2px"}} onClick={()=> handleFilter("Inactive")}>Inactive</MDBBtn>
            </MDBBtnGroup>
            </MDBCol>
        </MDBRow>
    </MDBContainer>
  );
}

export default UserList
