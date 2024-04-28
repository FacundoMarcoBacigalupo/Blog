/* eslint-disable react/prop-types */
import { auth } from "../../../firebase.js"
import { useNavigate } from "react-router";
import "./profile.css"
import { useAuthContext } from "../../../Context/AuthProvider.jsx";


const Profile = ({email, rol}) => {
    const navigate = useNavigate();

    const { closeSesion } = useAuthContext()


    return (
        <div className="containerProfile">
            <h1>Email: <span>{email}</span></h1>
            <h2>Tu rol es: <span>{rol}</span></h2>
            
            <button className="btnNavBar" onClick={() => {
                    closeSesion(auth)
                    navigate("/")
                }}>Cerrar sesion</button>
        </div>
    )
}

export default Profile