import { Link } from "react-router-dom"
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore"
import { db } from "../../firebase.js";
import "./footer.css"

const Footer = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const postRef = collection(db, "posts");
        getDocs(postRef)
            .then(res => {
                const response = res.docs.map(doc => ({ id: doc.id, ...doc.data() }))
                setBlogs(response)
            })
            .catch(error => console.error(error))
    }, [])

    return (
        <footer className="site-footer">
            <div className="footer-inner">
                <div className="footer-col">
                    <div className="footer-brand">
                        <span className="brand-dot" />
                        <span className="brand-text">IT Noticias</span>
                    </div>
                    <p className="footer-desc">
                        Noticias, análisis y tutoriales sobre el mundo IT: IA, hardware, seguridad,
                        desarrollo y tendencias tech. Actualizado diariamente.
                    </p>
                    <div className="footer-social">
                        <a href="https://github.com/FacundoMarcoBacigalupo" target="_blank" rel="noreferrer" aria-label="GitHub">GH</a>
                        <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">IN</a>
                        <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="X">X</a>
                    </div>
                </div>

                <div className="footer-col">
                    <h6 className="footer-title">Últimos blogs</h6>
                    <div className="footer-list">
                        {blogs.slice(0, 5).map((blog) => (
                            <Link key={blog.id} to={`/post/${blog.id}`} className="footer-link">
                                {blog.title}
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="footer-col">
                    <h6 className="footer-title">Categorías</h6>
                    <div className="footer-list">
                        <Link to="/" onClick={() => {}} className="footer-link">IA</Link>
                        <Link to="/" className="footer-link">PC</Link>
                        <Link to="/" className="footer-link">IT General</Link>
                        <Link to="/" className="footer-link">Seguridad</Link>
                        <Link to="/" className="footer-link">Internet</Link>
                    </div>
                </div>

                <div className="footer-col">
                    <h6 className="footer-title">Stack</h6>
                    <div className="footer-list">
                        <span className="footer-link">React 18</span>
                        <span className="footer-link">Vite</span>
                        <span className="footer-link">Firebase</span>
                        <span className="footer-link">Tailwind CSS</span>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <span>© {new Date().getFullYear()} IT Noticias · Desarrollado por Statim Software</span>
                <span className="footer-bottom-links">
                    <Link to="/privacidad">Privacidad</Link>
                    <Link to="/terminos">Términos</Link>
                </span>
            </div>
        </footer>
    )
}

export default Footer;