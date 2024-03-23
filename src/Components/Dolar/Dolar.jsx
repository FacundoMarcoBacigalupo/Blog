import { useEffect, useState } from "react"
import "./dolar.css"


const Dolar = () => {
    const [blueASK, setBlueASK] = useState("")
    const [blueBID, setblueBID] = useState("")


    useEffect(() => {
        if (typeof window !== "undefined"){
            const url = "https://criptoya.com/api/dolar"
            fetch(url)
            .then(response => response.json())
            .then(data =>{
                setBlueASK(`Dolar Blue venta: $${data.blue.ask}`)
                setblueBID(`Dolar Blue compra: $${data.blue.bid}`)
            })
            .catch(error => console.error(error))
        }
    }, [])


    return (
            <div className="dPrices">
                <p className="dStylePrices">{ blueASK }</p>
                <p className="dStylePrices">{ blueBID }</p>
            </div>
    )
}


export default Dolar