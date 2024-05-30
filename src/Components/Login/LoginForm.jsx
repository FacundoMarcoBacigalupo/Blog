import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../Context/AuthProvider.jsx";
import "./loginForm.css"



const LoginForm = () => {
    const [isRegister, setIsRegister] = useState(false)
    const [userEmail, setUserEmail] = useState("")
    const [userPassword, setUserPassword] = useState("")

    const navigate = useNavigate();

    const { registerUser, loginUser } = useAuthContext()


    const handleSubmit = async(e) =>{
        try {
            e.preventDefault();
            try {
                if (isRegister) {
                    await registerUser(userEmail, userPassword);
                }
                else {
                    await loginUser(userEmail, userPassword);
                }
                
                navigate("/");
            }
            catch (error) {
                console.log(error.message);
            }
        }
        catch (error) {
            console.log(error.message);
            
            switch(error.code){
                case "auth/email-already-in-use": alert("El email ya se esta usando")
                break;
                
                case "auth/invalid-email": alert("Email invalido")
                break;
                
                case "auth/weak-password": alert("La contraseña es muy debil")
                break;
                
                case "auth/too-many-requests": alert("Muchos intentos seguidos, inténtalo más tarde")
                break;
                
                default: alert("Algo salio mal")
            }
        }
    }


    return (
        <>
            <div className="containerLogin">
                <form className="styleForm" onSubmit={(e) => handleSubmit(e)}>
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