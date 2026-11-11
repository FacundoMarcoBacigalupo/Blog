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

            </div>

            <div className="footer-bottom">
                <span>© {new Date().getFullYear()} IT Noticias · Desarrollado por Statim Software</span>
            </div>
        </footer>
    )
}

export default Footer;