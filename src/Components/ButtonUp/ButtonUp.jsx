import { useEffect, useState } from "react";
import UP from "../../Assets/up.png"
import "./buttonUp.css";


const ButtonUp = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };
        window.addEventListener("scroll", toggleVisibility);
        
        return () => {
            window.removeEventListener("scroll", toggleVisibility);
        };
    }, []);


    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    if(isVisible){
        return (
            <button className="scroll-button" onClick={scrollToTop}>
                <img src={UP} alt="Boton subir" />
            </button>
        );
    }
};


export default ButtonUp;