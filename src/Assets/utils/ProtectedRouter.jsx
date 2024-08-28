/* eslint-disable react/prop-types */
import { Navigate, Outlet } from "react-router-dom"
import { useAuthContext } from "../../Context/AuthProvider.jsx";
import { useEffect, useState } from "react";

const ProtectedRouter = ({ redirectPath="/" }) =>{
    const { getRol } = useAuthContext();
    const [rolUser, setRolUser] = useState(null);

    useEffect(() => {
        const fetchRol = async () => {
            try {
                const rol = await getRol();
                setRolUser(rol);
            } catch (error) {
                console.error("Error al obtener el rol:", error);
            }
        };
        
        fetchRol();
    }, [getRol]);

    if (rolUser === null) {
        // Si el rol aún no se ha cargado, muestra un componente de carga o simplemente devuelve null
        return null;
    }


    const canActivate = rolUser === "admin"

    if(!canActivate){
        return <Navigate to={redirectPath} replace />
    }
    return <Outlet />
}

export default ProtectedRouter