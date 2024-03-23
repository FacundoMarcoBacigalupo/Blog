/* eslint-disable react-hooks/rules-of-hooks */
import house from "../../Assets/home.png"
import mail from "../../Assets/email.png"
import phone from "../../Assets/phone.png"
import mercadoPago from "../../Assets/mercadoPago.png"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore"
import { db } from "../../firebase.js";
import "./footer.css"


const footer = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
		const postRef = collection(db, "posts");
		
		getDocs(postRef)
			.then( res =>{
				const response = res.docs.map( doc =>{
					return {id:doc.id, ...doc.data()}
				})
				setBlogs(response)
			})
			.catch(error => console.error(error))
	}, [])


    return (
            <footer className="text-center text-lg-start text-white" style={{backgroundColor:"rgb(17, 17, 17)"}}>
                <section className="d-flex justify-content-center p-2 colorUpDown">
                    <p>
                        Se puede donar mediante Mercado Pago, <span className="text-danger">CVU: 0000003100004037602282</span>
                        <a href="https://mpago.la/32wtK5Y" target="_blank" rel="noopener noreferrer">
                            <img className="imgStyleRRSS" src={mercadoPago} alt="Mercado Pago" />
                        </a> Muchas Gracias.
                    </p>
                </section>
            
            
                <section>
                <div className="container text-center text-md-start mt-5">
                    {/* Grid row  */}
                    <div className="row mt-3">
            
                    {/* Grid column */}
                    <div className="col-md-3 col-lg-4 col-xl-3 mx-auto">
                        <h6 className="text-uppercase fw-bold">Cañuelas Te Escucha</h6>
                        <hr className="mb-3 mt-0 d-inline-block mx-auto hrStyles" />
                        <p>Escuchamos la verdad de los cañuelenses.</p>
                    </div>
                    {/* Grid column */}
            
                    {/* Grid column */}
                    <div className="col-md-2 col-lg-2 col-xl-2 mx-auto">
                        <h6 className="text-uppercase fw-bold">Ultimos blogs</h6>
                        <hr className="mb-3 mt-0 d-inline-block mx-auto hrStyles" />
                        {
                        blogs.map((blog, index) => (
                            index < 4 && <p key={blog.id}>
                                <Link to={`/post/${blog.id}`} className="text-white">{blog.title}</Link>
                            </p>
                            ))
                        }
                    </div>
                    {/* Grid column */}
            
            
                    {/* Grid column */}
                    <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0">
                        <h6 className="text-uppercase fw-bold">Contacto</h6>
                        <hr className="mb-3 mt-0 d-inline-block mx-auto hrStyles" />
                        <p><img className="imgStyle" src={house} alt="house" /> Buenos aires, cañuelas</p>
                        <p><img className="imgStyle" src={mail} alt="mail" /> micamarco@gmail.com</p>
                        <p><img className="imgStyle" src={phone} alt="phone" /> +54 11 2252-4921</p>
                    </div>
                    {/* Grid column */}
                    </div>
                    {/* Grid row */}
                </div>
                </section>
            
                <div className="text-center p-3 colorUpDown">
                    <p className="text-white">© 2024 Copyright: Cañuelas Te Escucha</p>
                </div>
            </footer>
    )
}


export default footer