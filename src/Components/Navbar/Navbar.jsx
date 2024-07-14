/* eslint-disable react-hooks/rules-of-hooks */
import menu from "../../Assets/img/menu.png";
import { NavLink, Link, useLocation } from "react-router-dom";
import { auth } from "../../firebase.js";
import { useAuthContext } from "../../Context/AuthProvider.jsx";
import "./navbar.css";

const Navbar = () => {
    const { user, closeSesion, categorySelected, setCategorySelected } = useAuthContext();
    const location = useLocation();

    return (
        <section className="ftco-section">
            <div className="container">
                <nav className="navbar navbar-expand-lg ftco_navbar ftco-navbar-light" id="ftco-navbar">
                    <div className="container">
                        <p id="styleLg" className="navbar-brand">
                            <Link to="/" onClick={() => setCategorySelected("")}>IT Noticias</Link>
                        </p>
                        
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                            <img id="menuT" src={menu} alt="menuTogle" />
                        </button>
                        
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <ul className="navbar-nav ml-auto mr-md-3">
                                <li className="nav-item">
                                    <NavLink to="/" onClick={() => setCategorySelected("")} className={`nav-link ${ categorySelected == "" ? "activ" : "" }`}>Inicio</NavLink>
                                </li>
                                {user != null && user.rol === "admin" && (
                                    <li className="nav-item">
                                        <NavLink to="/publicar-post" className="nav-link">Crear Post</NavLink>
                                    </li>
                                )}
                                
                                <li className="nav-item">
                                    <NavLink to="/" className={`nav-link ${ categorySelected == "IA" ? "activ" : "" }`} onClick={() => setCategorySelected("IA")}>IA</NavLink>
                                </li>
                                
                                <li className="nav-item">
                                    <NavLink to="/" className={`nav-link ${ categorySelected == "PC" ? "activ" : "" }`} onClick={() => setCategorySelected("PC")}>PC</NavLink>
                                </li>
                                
                                <li className="nav-item">
                                    <NavLink to="/" className={`nav-link ${ categorySelected == "IT GENERAL" ? "activ" : "" }`} onClick={() => setCategorySelected("IT GENERAL")}>IT GENERAL</NavLink>
                                </li>
                                
                                <li className="nav-item">
                                    <NavLink to="/" className={`nav-link ${ categorySelected == "SEGURIDAD" ? "activ" : "" }`} onClick={() => setCategorySelected("SEGURIDAD")}>SEGURIDAD</NavLink>
                                </li>
                                
                                <li className="nav-item">
                                    <NavLink to="/" className={`nav-link ${ categorySelected == "INTERNET" ? "activ" : "" }`} onClick={() => setCategorySelected("INTERNET")}>INTERNET</NavLink>
                                </li>
                            </ul>
                            
                            {user && user.uid ? (
                                <div id="containerLogin">
                                    <button className="btnNavBar">
                                        <Link to={`/profile/${user.uid}`} className="nav-link">Perfil</Link>
                                    </button>
                                    <button className="btnNavBar" onClick={() => closeSesion(auth)}>Cerrar sesión</button>
                                </div>
                            ) : (
                                <ul className="navbar-nav ml-auto mr-md-3">
                                    <li className="nav-item">
                                        <NavLink to="/login" onClick={() => setCategorySelected("A")} className={`nav-link ${location.pathname === "/login" ? "activ" : ""}`}>Login</NavLink>
                                    </li>
                                </ul>
                            )}
                        </div>
                    </div>
                </nav>
            </div>
        </section>
    );
};

export default Navbar;