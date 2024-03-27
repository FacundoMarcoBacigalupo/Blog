import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth, db } from "../../firebase.js"
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./loginForm.css"



const LoginForm = () => {
    const [isRegister, setIsRegister] = useState(false)
    const [userEmail, setUserEmail] = useState("")
    const [userPassword, setUserPassword] = useState("")

    const navigate = useNavigate();

    const handleSubmit = async(e) =>{
        try {
            e.preventDefault();
            
            if(isRegister === true){
                await createUserWithEmailAndPassword(auth, userEmail, userPassword)
                
                const userRef = collection(db, "users");
                await addDoc(userRef, { email: userEmail, rol: "user", });
            }
            else{
                await signInWithEmailAndPassword(auth, userEmail, userPassword)
            }
            
            navigate("/");
        }
        catch (error) {
            console.log(error.message);
            if(error.code === "auth/email-already-in-use"){
                alert("El email ya se esta usando")
            }
            else if(error.code === "auth/invalid-email"){
                alert("Email invalido")
            }
            else if(error.code === "auth/weak-password"){
                alert("La contraseña es muy debil")
            }
            else if (error.code){
                alert("Algo salio mal")
            }
        }
    }


    return (
        <>
            <div className="containerLogin">
                <form className="styleForm" onSubmit={handleSubmit}>
                    <h1>{ isRegister ? "Registrate" : "Inicia sesion" }</h1>         
                    
                    <div>
                        <div>
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder=""
                                autoComplete="off"
                                required
                                value={userEmail}
                                onChange={(e) => setUserEmail(e.target.value)}
                            />
                        </div>
                        
                        <div>
                            <label>Contraseña</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder=""
                                autoComplete="off"
                                required
                                value={userPassword}
                                onChange={(e) => setUserPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    
                    <button className="buttonChange" type="submit">{ isRegister ? "Registrate" : "Inicia sesion" }</button>
                </form>
            </div>
            <br />
            <button className="buttonChange" onClick={() => setIsRegister(!isRegister)}>
                { isRegister ? "Ya tengo una cuenta" : "Quiero registrarme" }
            </button>
        </>
    )
}


export default LoginForm