/* eslint-disable react-hooks/rules-of-hooks */
import menu from "../../Assets/img/menu.png"
import { NavLink } from "react-router-dom"
import { useState } from "react"
import { auth, db } from "../../firebase.js"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import "./navbar.css"


const navbar = () => {
    const [user, setUser] = useState({})

    async function getRol(uid) {
        try {
            const userRolRef = doc( db, "users", uid )
            const rolRef = await getDoc(userRolRef);
            if (rolRef.exists()){
                const infoRol = rolRef.data().rol
                return infoRol
            }
            else{
                throw new Error("El documento de usuario no existe");
            }
        }
        catch (error) {
            console.error("Error al obtener el rol del usuario:", error);
            return "user"
        }
    }


    function setUserWithFirebaseAndRol (userFirebase){
        if(userFirebase){
            getRol(userFirebase.uid).then((rol) =>{
                const userData = {
                    uid: userFirebase.uid,
                    email: userFirebase.email,
                    rol: rol || "user"
                }
                console.log(userData)
                return setUser(userData)
            })
        }
        else{
            setUser({})
        }
    }


    onAuthStateChanged(auth, (userFirebase) =>{
        if(userFirebase){
            if(!user || !user.rol){
                setUserWithFirebaseAndRol(userFirebase)
            }
        }
        else{
            setUser({})
        }
    })



    return (
        <section className="ftco-section">
            <div className="container">
                <nav className="navbar navbar-expand-lg ftco_navbar ftco-navbar-light" id="ftco-navbar">
                    <div className="container">
                        <p className="navbar-brand">Cañuelas Te Escucha</p>
                        
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                                <img id="menuT" src={menu} alt="menuTogle" />
                        </button>
                        
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <ul className="navbar-nav ml-auto mr-md-3">
                                <li className="nav-item"><NavLink  to="/" className="nav-link">Inicio</NavLink></li>
                                <li className="nav-item"><NavLink  to="/publicar-post" className="nav-link">Crear Post</NavLink></li>
                            </ul>
                            {
                            user && user.uid ? <button onClick={() => signOut(auth)}>Cerrar sesion</button> : <li className="nav-item"><NavLink  to="/login" className="nav-link" style={{color:"#fff"}}>Login</NavLink></li>
                            }
                        </div>
                    </div>
                </nav>
            </div>
        </section>
    )
}


export default navbar