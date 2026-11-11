import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../Context/AuthProvider.jsx";
import { useState, useEffect } from "react";
import "./navbar.css";

const CATEGORIES = ["IA", "PC", "IT GENERAL", "SEGURIDAD", "INTERNET"];

const Navbar = () => {
    const { user, closeSesion, categorySelected, setCategorySelected } = useAuthContext();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [catOpen, setCatOpen] = useState(false);
    const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const handleCloseSesion = async () => {
        await closeSesion();
        navigate("/");
        setOpen(false);
    };

    const go = (cat) => { setCategorySelected(cat); setOpen(false); setCatOpen(false); };

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

                    <div className="nav-dropdown">
                        <button className={`nav-link ${CATEGORIES.includes(categorySelected) ? "active" : ""}`} onClick={() => setCatOpen(!catOpen)}>
                            Categorías ▾
                        </button>
                        {catOpen && (
                            <div className="nav-dropdown-menu">
                                {CATEGORIES.map((c) => (
                                    <button key={c} className={`nav-dropdown-item ${categorySelected === c ? "active" : ""}`} onClick={() => go(c)}>{c}</button>
                                ))}
                                <button className="nav-dropdown-item" onClick={() => go("")}>Todas</button>
                            </div>
                        )}
                    </div>

                    {user != null && user.rol === "admin" && (
                        <NavLink to="/publicar-post" className="nav-link" onClick={() => setOpen(false)}>Crear Post</NavLink>
                    )}

                    <button className="theme-toggle" onClick={() => setTheme(theme === "light" ? "dark" : "light")} aria-label="Cambiar tema">
                        {theme === "light" ? "🌙" : "☀️"}
                    </button>

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