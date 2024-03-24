import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth, db } from "../../firebase.js"
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";


const LoginForm = () => {
    const [isRegister, setIsRegister] = useState(false)
    const [userEmail, setUserEmail] = useState("")
    const [userPassword, setUserPassword] = useState("")
    
    const navigate = useNavigate();

    const handleSubmit = async(e) =>{
        try {
            e.preventDefault();
            
            if(isRegister){
                await createUserWithEmailAndPassword(auth, userEmail, userPassword)
                const userRef = collection(db, "users");
                await addDoc(userRef, {email: userEmail, rol:"user"})
            }
            else{
                signInWithEmailAndPassword(auth, userEmail, userPassword)
            }
            
            navigate("/");
        }
        catch (error) {
            console.log("Error de inicio de sesión:", error.message);
        }
    }


    return (
        <div>
            <h1>{ isRegister ? "Registrate" : "Inicia sesion" }</h1>
            
            <form onSubmit={handleSubmit}>
                <label>Email</label>
                <input
                    type="text"
                    name="email"
                    id="email"
                    value={userEmail}
                    placeholder="Escriba su Email"
                    onChange={(e) => setUserEmail(e.target.value)}
                />
                
                <label>Contraseña</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    value={userPassword}
                    placeholder="Escriba su Contraseña"
                    onChange={(e) => setUserPassword(e.target.value)}
                />
                
                <button type="submit">{ isRegister ? "Registrate" : "Inicia sesion" }</button>
            </form>
            
            <button onClick={() => setIsRegister(!isRegister)}>
                { isRegister ? "Ya tengo una cuenta" : "Quiero registrarme" }
            </button>
        </div>
    )
}


export default LoginForm