import { useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../../firebase.js"
import { allStaticPosts as staticPosts } from "../../data/posts2.js"
import List from "./List/List.jsx"
import Loading from "../Loading/Loading.jsx"
import "./blog.css"

const Blog = () => {
    const [blogEntries, setBlogEntries] = useState([])
    const [sort, setSort] = useState("newest")
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		setLoading(true)
		
		const postRef = collection(db, "posts");
		getDocs(postRef)
			.then( res =>{
				const response = res.docs.map( doc =>{
					return {id:doc.id, ...doc.data()}
				})
				setBlogEntries([...staticPosts, ...response])
			})
			.catch(error => { console.error(error); setBlogEntries(staticPosts); })
			.finally(() => setLoading(false))
	}, [])

    const filtered = [...blogEntries].sort((a, b) => {
        const da = new Date(a.date || 0).getTime();
        const db_ = new Date(b.date || 0).getTime();
        return sort === "newest" ? db_ - da : da - db_;
    });
	if (loading){
        return <Loading />
    }

    return (
        <div className="contenedor">
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16, gap: 8 }}>
                <button onClick={() => setSort("newest")} className={sort === "newest" ? "btn btn-active" : "btn"}>Más recientes</button>
                <button onClick={() => setSort("oldest")} className={sort === "oldest" ? "btn btn-active" : "btn"}>Más antiguos</button>
            </div>
			<List blogEntries={filtered}/>
        </div>
    )
}

export default Blog