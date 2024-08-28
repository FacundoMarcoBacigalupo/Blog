import { useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../../firebase.js"
import List from "./List/List.jsx"
import Loading from "../Loading/Loading.jsx"
import "./blog.css"

const Blog = () => {
    const [blogEntries, setBlogEntries] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		setLoading(true)
		
		const postRef = collection(db, "posts");
		getDocs(postRef)
			.then( res =>{
				const response = res.docs.map( doc =>{
					return {id:doc.id, ...doc.data()}
				})
				setBlogEntries(response)
			})
			.catch(error => console.error(error))
			.finally(() => setLoading(false))
	}, [])

	if (loading){
        return <Loading />
    }

    return (
        <div className="contenedor">
			<List blogEntries={blogEntries}/>
        </div>
    )
}

export default Blog