import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../../firebase.js";
import { useAuthContext } from "../../Context/AuthProvider.jsx";
import { useState } from "react";
import "./navbar.css";

const Navbar = () => {
    const { user, closeSesion, categorySelected, setCategorySelected } = useAuthContext();
    const location = useLocation();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const handleCloseSesion = async () => {
        await closeSesion(auth);
        navigate("/");
        setOpen(false);
    };

    const go = (cat) => { setCategorySelected(cat); setOpen(false); };

    return (
        <header className="site-nav">
            <div className="nav-inner">
                <Link to="/" className="nav-brand" onClick={() => go("")}>
                    <span className="brand-dot" />
                    <span className="brand-text">IT Noticias</span>
                </Link>

                <button className="nav-toggle" onClick={() => setOpen(!open)} aria-label="Menú">
                    <span className={open ? "bar open" : "bar"} />
                    <span className={open ? "bar open" : "bar"} />
                    <span className={open ? "bar open" : "bar"} />
                </button>

                <nav className={`nav-links ${open ? "open" : ""}`}>
                    <NavLink to="/" onClick={() => go("")} className={`nav-link ${categorySelected === "" ? "active" : ""}`}>Inicio</NavLink>
                    {user != null && user.rol === "admin" && (
                        <NavLink to="/publicar-post" className="nav-link" onClick={() => setOpen(false)}>Crear Post</NavLink>
                    )}
                    <button className={`nav-link ${categorySelected === "IA" ? "active" : ""}`} onClick={() => go("IA")}>IA</button>
                    <button className={`nav-link ${categorySelected === "PC" ? "active" : ""}`} onClick={() => go("PC")}>PC</button>
                    <button className={`nav-link ${categorySelected === "IT GENERAL" ? "active" : ""}`} onClick={() => go("IT GENERAL")}>IT General</button>
                    <button className={`nav-link ${categorySelected === "SEGURIDAD" ? "active" : ""}`} onClick={() => go("SEGURIDAD")}>Seguridad</button>
                    <button className={`nav-link ${categorySelected === "INTERNET" ? "active" : ""}`} onClick={() => go("INTERNET")}>Internet</button>

                    {user && user.uid ? (
                        <div className="nav-auth">
                            <Link to={`/profile/${user.uid}`} className="nav-link" onClick={() => setOpen(false)}>Perfil</Link>
                            <button className="nav-btn" onClick={handleCloseSesion}>Salir</button>
                        </div>
                    ) : (
                        <Link to="/login" className="nav-btn primary" onClick={() => setOpen(false)}>Login</Link>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Navbar;