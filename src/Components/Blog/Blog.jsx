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
    const [filterOpen, setFilterOpen] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        const postRef = collection(db, "posts");
        getDocs(postRef)
            .then(res => {
                const response = res.docs.map(doc => ({ id: doc.id, ...doc.data() }))
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

    if (loading) {
        return <Loading />
    }

    return (
        <div className="blog-page">
            <div className="filter-bar">
                <button className="filter-toggle" onClick={() => setFilterOpen(!filterOpen)}>
                    <span>Filtros</span>
                    <span className="filter-caret">{filterOpen ? "▴" : "▾"}</span>
                </button>
                {filterOpen && (
                    <div className="filter-options">
                        <button className={sort === "newest" ? "filter-option active" : "filter-option"} onClick={() => { setSort("newest"); setFilterOpen(false); }}>Más recientes</button>
                        <button className={sort === "oldest" ? "filter-option active" : "filter-option"} onClick={() => { setSort("oldest"); setFilterOpen(false); }}>Más antiguos</button>
                    </div>
                )}
            </div>
            <div className="contenedor">
                <List blogEntries={filtered} />
            </div>
        </div>
    )
}

export default Blog