import menu from "../../Assets/menu.png"
import { NavLink } from "react-router-dom"
import "./navbar.css"


const navbar = () => {
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
                        </div>
                    </div>
                </nav>
            </div>
        </section>
    )
}


export default navbar