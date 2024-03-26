/* eslint-disable react-hooks/rules-of-hooks */
import menu from "../../Assets/img/menu.png"
import { NavLink } from "react-router-dom"
import { auth} from "../../firebase.js"
import { useAuthContext } from "../../Context/AuthProvider.jsx"
import { signOut } from "firebase/auth"
import "./navbar.css"


const navbar = () => {
    const { user } = useAuthContext()

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
                                {
                                    user && user.email === import.meta.env.VITE_GMAIL && user.uid === import.meta.env.VITE_UID && <li className="nav-item"><NavLink  to="/publicar-post" className="nav-link">Crear Post</NavLink></li>
                                }
                            </ul>
                            {
                            user && user.uid ? <div className="btnContainer">
                                <button className="btnNavBar" onClick={() => signOut(auth)}>Cerrar sesion</button>
                            </div> : <li className="nav-item"><NavLink  to="/login" className="nav-link" style={{color:"#fff"}}>Login</NavLink></li>
                            }
                        </div>
                    </div>
                </nav>
            </div>
        </section>
    )
}


export default navbar