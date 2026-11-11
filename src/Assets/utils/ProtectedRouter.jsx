/* eslint-disable react/prop-types */
import { Navigate, Outlet } from "react-router-dom"
import { useAuthContext } from "../../Context/AuthProvider.jsx";
import { useEffect, useState } from "react";

const ProtectedRouter = ({ redirectPath="/" }) =>{
    const { getRol, loading, user } = useAuthContext();
    const [rolUser, setRolUser] = useState(null);

    useEffect(() => {
        if (loading) return;
        const fetchRol = async () => {
            try {
                const rol = await getRol();
                setRolUser(rol);
            } catch (error) {
                console.error("Error al obtener el rol:", error);
                setRolUser("user");
            }
        };
        
        fetchRol();
    }, [getRol, loading, user]);

    if (loading || rolUser === null) {
        return <div style={{display:"grid",placeItems:"center",minHeight:"60vh",color:"#a1a1aa"}}>Cargando…</div>;
    }


    const canActivate = rolUser === "admin"

    if(!canActivate){
        return <Navigate to={redirectPath} replace />
    }
    return <Outlet />
}

export default ProtectedRouter