import React from 'react'
import {useSelector} from "react-redux"
import {Navigate, useLocation} from "react-router-dom"

const ProtectedRoute = ({children}) => {
    const { user } = useSelector((state) => state.auth)
    let location = useLocation();

    if(user?.nic == null || user?.nic == "") {
        return <Navigate to="/auth" state={{ from: location}} replace />
    }
 return children

};

export default ProtectedRoute;