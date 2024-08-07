/* eslint-disable react/prop-types */
import { onAuthStateChanged, signOut } from "firebase/auth"
import { doc, getDoc, addDoc, collection, where, getDocs, query } from "firebase/firestore"
import React, { useCallback, useContext, useEffect, useState } from "react"
import { auth, db } from "../firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";


const AuthContext = React.createContext([]);

export const useAuthContext = () => useContext(AuthContext);


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [categorySelected, setCategorySelected] = useState("");


    const registerUser = async(email, password) => {
        try {
            // Registrar al usuario en Firebase Authentication
            await createUserWithEmailAndPassword(auth, email, password);
            
            // Almacenar el UID del usuario en Firestore
            const userRef = collection(db, "users");
            const docRef = await addDoc(userRef, { email: email, rol: "user" });
            
            // Obtener el UID del documento creado en Firestore
            const uid = docRef.id;
            
            // Actualizar el estado del usuario con el nuevo UID de Firestore
            setUser({ uid: uid, email: email, rol: "user" });
        }
        catch (error) {
            console.error("Error al registrar al usuario:", error);
            throw error;
        }
    };
    

    const ALGO = async(email, password) => {
        try {
            console.log("first")
        }
        catch (error) {
            console.error("Error al iniciar sesión:", error);
            throw error;
        }
    };

    const loginUser = async(email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            
            // Obtener el ID del documento en Firestore basado en el email del usuario
            const userRef = collection(db, "users");
            const querySnapshot = await getDocs(query(userRef, where("email", "==", email)));
            const userDoc = querySnapshot.docs[0];
            const uid = userDoc.id;
            
            // Actualizar el estado del usuario con el UID del documento en Firestore
            setUser({ uid: uid, email: email });
            return userCredential.user;
        }
        catch (error) {
            console.error("Error al iniciar sesión:", error);
            throw error;
        }
    };

    const closeSesion = () => {
        signOut(auth)
            .then(() => {
                setUser(null);
                window.location.reload(); // Recargar la página después de cerrar sesión
            })
            .catch(error => {
                console.error("Error al cerrar sesión:", error);
            });
    };


        useEffect(() => {
            const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                const userRef = doc(db, "users", currentUser.uid);
                const userDoc = await getDoc(userRef);
                const userData = userDoc.data();
                setUser({ uid: currentUser.uid, email: currentUser.email, rol: userData.rol });
            } else {
                setUser(null);
            }
            });
        
            return unsubscribe;
        }, []);



        const getRol = useCallback(async () => {
            try {
                if (user && user.uid) {
                    const userRef = doc(db, "users", user.uid); 
                    const res = await getDoc(userRef);
                    const userData = res.data();
                    return userData ? userData.rol : "user";
                }
            } catch (error) {
                console.error(error);
            }
        }, [user]);



        useEffect(() => {
            const updateUserRole = async () => {
                if (user) {
                    const rolUser = await getRol();
                    setUser(prevUser => ({ ...prevUser, rol: rolUser }));
                }
            };
        
            // Verifica si el usuario está autenticado antes de actualizar su rol
            if (user && user.uid) {
                updateUserRole();
            }
        }, [user, getRol]);



    return (
        <AuthContext.Provider value={{ user, registerUser, loginUser, getRol, closeSesion, categorySelected, setCategorySelected }}>
            { children }
        </AuthContext.Provider>
    )
}


export default AuthProvider