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
        <div className="con">
            <div className="container">
                <form className="formLogin" onSubmit={handleSubmit}>
                    <div className="text">
                        { isRegister ? "Registrate" : "Inicia sesion" }
                    </div>              
                    
                    <div className="form-row">
                        <div className="input-data">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder=""
                                autoComplete="off"
                                required
                                value={userEmail}
                                className="inputLogin"
                                onChange={(e) => setUserEmail(e.target.value)}
                            />
                            <div className="underline"></div>
                            <label>Email</label>
                        </div>
                        
                        <div className="input-data">
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
                            <div className="underline"></div>
                            <label>Contraseña</label>
                        </div>
                    </div>
                    
                    <button type="submit">{ isRegister ? "Registrate" : "Inicia sesion" }</button>
                </form>
            </div>
            
            <button onClick={() => setIsRegister(!isRegister)}>
                { isRegister ? "Ya tengo una cuenta" : "Quiero registrarme" }
            </button>
        </div>
    )
}


export default LoginForm