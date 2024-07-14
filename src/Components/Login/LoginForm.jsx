import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../Context/AuthProvider.jsx";
import Swal from "sweetalert2";
import "./loginForm.css"


const LoginForm = () => {
    const [isRegister, setIsRegister] = useState(false)
    const [userEmail, setUserEmail] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const [setsuccess, setSetsuccess] = useState(false)

    const { registerUser, loginUser, user } = useAuthContext()
    const navigate = useNavigate();

    const handleSubmit = async(e) =>{
            e.preventDefault();
            try {
                if (isRegister) {
                    await registerUser(userEmail, userPassword);
                    Swal.fire({
                        title: "Registrado",
                        icon: "success"
                    });
                    setSetsuccess(true);
                }
                else {
                    await loginUser(userEmail, userPassword);
                    Swal.fire({
                        title: "Sesion iniciada",
                        icon: "success"
                    });
                    setSetsuccess(true);
                }
            }
            catch (error) {
                // console.log(error.message);
                setSetsuccess(false);
                switch(error.code){
                    case "auth/email-already-in-use":
                        Swal.fire({
                            title: "Email en uso",
                            text: "Prueba con otro email",
                            icon: "error"
                        });
                    break;
                    
                    case "auth/invalid-email":
                        Swal.fire({
                            title: "Email invalido",
                            text: "Prueba con otro email",
                            icon: "error"
                        });  
                    break;
                    
                    case "auth/weak-password":
                        Swal.fire({
                            title: "La contraseña es muy debil",
                            text: "Cambia la contraseña o prueba con otra",
                            icon: "error"
                        });
                    break;
                    
                    case "auth/too-many-requests":
                        Swal.fire({
                            title: "Muchos intentos seguidos, inténtalo más tarde",
                            icon: "error"
                        });
                    break;
                    
                    default:
                        Swal.fire({
                            title: "Algo salio mal",
                            icon: "error"
                        });
                }
            }
    }

    if(setsuccess){
        navigate(`/profile/${user.uid}`);
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