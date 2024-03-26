/* eslint-disable react/prop-types */
import { Navigate, Outlet } from "react-router-dom"
import { useAuthContext } from "../../Context/AuthProvider.jsx";



const ProtectedRouter = ({ redirectPath="/" }) =>{
    const { user } = useAuthContext()

    const canActivate = user && user.email === import.meta.env.VITE_GMAIL && user.uid === import.meta.env.VITE_UID

    if(!canActivate){
        return <Navigate to={redirectPath} replace />
    }
    return <Outlet />
}

export default ProtectedRouter