/* eslint-disable react-hooks/rules-of-hooks */
import menu from "../../Assets/img/menu.png"
import { NavLink, Link } from "react-router-dom"
import { auth } from "../../firebase.js"
import { useAuthContext } from "../../Context/AuthProvider.jsx"
import "./navbar.css"


const navbar = () => {
    const { user, closeSesion } = useAuthContext()

    return (
        <section className="ftco-section">
            <div className="container">
                <nav className="navbar navbar-expand-lg ftco_navbar ftco-navbar-light" id="ftco-navbar">
                    <div className="container">
                        <p id="styleLg" className="navbar-brand"><Link to="/">Cañuelas Te Escucha</Link></p>
                        
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                                <img id="menuT" src={menu} alt="menuTogle" />
                        </button>
                        
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <ul className="navbar-nav ml-auto mr-md-3">
                                <li className="nav-item"><NavLink  to="/" className="nav-link">Inicio</NavLink></li>
                                {user != null && user.rol === "admin" && <li className="nav-item"><NavLink to="/publicar-post" className="nav-link">Crear Post</NavLink></li>}
                            </ul>
                            {
                            user && user.uid ? <div>
                                    <button className="btnNavBar"><Link  to={`/profile/${user.uid}`} className="nav-link">Perfil</Link></button>
                                    <button className="btnNavBar" onClick={() => closeSesion(auth)}>Cerrar sesión</button>
                                </div> : <ul className="navbar-nav ml-auto mr-md-3">
                                            <li className="nav-item"><NavLink to="/login" className="nav-link">Login</NavLink></li>
                                        </ul>
                            }
                        </div>
                    </div>
                </nav>
            </div>
        </section>
    )
}


export default navbar