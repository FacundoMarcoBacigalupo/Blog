import { getDoc, doc } from 'firebase/firestore'
import { db } from "../../../firebase.js"
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Post from './Post/Post.jsx'
import Loading from "../../Loading/Loading.jsx"



const ViewPosts = () => {
    const [blogEntries, setBlogEntries] = useState([])
    const [loading, setLoading] = useState(true)

    const { postId } = useParams()


    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setLoading(true)
        
        const docR = doc( db, "posts", postId )
        getDoc(docR)
            .then( res =>{
                const response = {id:res.id, ...res.data()}
                setBlogEntries(response)
            } )
            .catch( error => console.error(error))
            
            .finally(() => setLoading(false))
    }, [postId])

    if (loading){
        return <Loading />
    }


    return (
        <Post {...blogEntries}/>
    )
}


export default ViewPosts