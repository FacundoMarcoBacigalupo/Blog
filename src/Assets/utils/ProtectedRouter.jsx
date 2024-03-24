/* eslint-disable react/prop-types */
import { Navigate, Outlet } from "react-router-dom"


const ProtectedRouter = ({ canActivate, redirectPath="/" }) =>{
    if(!canActivate){
        return <Navigate to={redirectPath} replace />
    }
    return <Outlet />
}

export default ProtectedRouter