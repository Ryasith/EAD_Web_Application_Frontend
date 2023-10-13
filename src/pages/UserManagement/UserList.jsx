import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { userlist, reset } from '../../features/user/userSlice'
import { useSelector, useDispatch } from 'react-redux'
import { MDBTable, MDBTableHead, MDBTableBody, MDBRow, MDBCol, MDBContainer, MDBBtn, MDBBtnGroup, MDBPagination, MDBPaginationItem, MDBPaginationLink } from 'mdb-react-ui-kit'
import Spinner from '../../components/Spinner'

function UserList() {

    const dispatch = useDispatch()
    const { userList, isLoading } = useSelector((state) => state.user)

    useEffect(() => {
        loadUserData();
    }, []);

    const loadUserData = async () => {
        dispatch(userlist())
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <MDBContainer>
            <div style={{ marginTop: "50px" }}>
                <h2>User List</h2>
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
                            {userList.length === 0 ? (
                                <MDBTableBody className='align-center mb-0'>
                                    <tr>
                                        <td colSpan={8} className='text-center mb-0'>No Users Found</td>
                                    </tr>
                                </MDBTableBody>
                            ) : (
                                userList.map((item, index) => (
                                    <MDBTableBody key={index}>
                                        <tr>
                                            <th scope='row'>{index + 1}</th>
                                            <td >{item.nic}</td>
                                            <td >{item.name}</td>
                                            <td >{item.email}</td>
                                            <td >{item.userRole}</td>
                                            <td >{item.isActive ? "Active" : "Inactive"}</td>
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

export default UserList
