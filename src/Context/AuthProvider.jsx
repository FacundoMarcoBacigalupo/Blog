/* eslint-disable react/prop-types */
import { onAuthStateChanged } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import React, { useContext, useState } from "react"
import { auth, db } from "../firebase"


const AuthContext = React.createContext([]);

export const useAuthContext = () => useContext(AuthContext);


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    async function getRol(uid) {
        try {
            const userRef = doc(db, "users", uid); 
            const res = await getDoc(userRef);
            const response = res.data();
            return response;
        } catch (error) {
            console.error(error);
            return null;
        }
    }


    onAuthStateChanged(auth, currentUser =>{
        if(currentUser){
            if(!user){
                getRol(currentUser.uid)
                    .then( response =>{
                        const userData = {
                            uid: currentUser.uid,
                            email: currentUser.email,
                            rol: response
                        }
                        return setUser(userData)
                    })
            }
        }
        else{
            setUser(null)
        }
    })


    return (
        <AuthContext.Provider value={{ user }}>
            { children }
        </AuthContext.Provider>
    )
}


export default AuthProvider