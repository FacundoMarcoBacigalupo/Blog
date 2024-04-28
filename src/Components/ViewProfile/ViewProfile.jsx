import { doc, getDoc } from "firebase/firestore"
import { db } from "../../firebase"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import Profile from "./Profile/Profile"
import Loading from "../Loading/Loading.jsx"


const ViewProfile = () => {
    const [userEntries, setUserEntries] = useState([])
    const [loading, setLoading] = useState(true)

    const { userId } = useParams()


    useEffect(() => {
        setLoading(true)
        
        const docR = doc( db, "users", userId )
        getDoc(docR)
            .then( res =>{
                const userData = { ...res.data() }
                setUserEntries(userData)
            } )
            
            .catch( error => console.error(error))
            .finally(() => setLoading(false))
    }, [userId])

    if (loading){
        return <Loading />
    }


    return (
        <Profile {...userEntries}/>
    )
}


export default ViewProfile