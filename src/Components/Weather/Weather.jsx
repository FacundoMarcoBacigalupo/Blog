import { Fragment, useEffect, useState } from "react"
import "./weather.css"


const Weather = () => {
    const [weatherInfo, setWeatherInfo] = useState({})
    const [iconoAnimado, setIconoAnimado] = useState('')

    async function icons (data){
        switch (data.weather[0].main) {
            case 'Thunderstorm':
                setIconoAnimado(await import("./IconsAnimated/thunder.svg"));
                break;
            
                case 'Drizzle':
                setIconoAnimado(await import("./IconsAnimated/rainy-2.svg"));
            break;
            
            case 'Rain':
                setIconoAnimado(await import("./IconsAnimated/rainy-7.svg"));
            break;
            
            case 'Snow':
                setIconoAnimado(await import("./IconsAnimated/snowy-6.svg"));
            break;
            
            case 'Clear':
                setIconoAnimado(await import("./IconsAnimated/day.svg"));
            break;
            
            case 'Atmosphere':
                setIconoAnimado(await import("./IconsAnimated/weather.svg"));
            break;
            
            case 'Clouds':
                setIconoAnimado(await import("./IconsAnimated/cloudy-day-1.svg"));
            break;
        }
    }


    useEffect(() => {
        const ApiKey = import.meta.env.VITE_API_KEY_WEATHER;
        
        if (typeof window !== "undefined"){
            const url = `https://api.openweathermap.org/data/2.5/weather?q=cañuelas&appid=${ApiKey}&units=metric`
            fetch(url)
            .then(response => response.json())
            .then(data =>{
                let MT = Math.round(data.main.temp)
                let weather = {
                    temperature: `${MT}°`,
                    humidity: `Humeda: ${data.main.humidity} %`,
                    wind: `Viento: ${data.wind.speed} km/h`
                }
                setWeatherInfo(weather)
                icons(data)
                
                .catch(error => console.error(error))
            })
        }
    }, [])


    let days =  new Date
    let day = days.getDate()
    
    let months = () =>{
        if(days.getMonth() === 0){
        return "Enero"
        }
        else if(days.getMonth() === 1){
            return "Febrero"
        }
        else if(days.getMonth() === 2){
            return "Marzo"
        }
        else if(days.getMonth() === 3){
            return "Abril"
        }
        else if(days.getMonth() === 4){
            return "Mayo"
        }
        else if(days.getMonth() === 5){
            return "Junio"
        }
        else if(days.getMonth() === 6){
            return "Julio"
        }
        else if(days.getMonth() === 7){
            return "Agosto"
        }
        else if(days.getMonth() === 8){
            return "Septiembre"
        }
        else if(days.getMonth() === 9){
            return "Octubre"
        }
        else if(days.getMonth() === 10){
            return "Noviembre"
        }
        else if(days.getMonth() === 11){
            return "Diciembre"
        }
    }
    let month = months()


    return (
        <Fragment>
            {weatherInfo && (
                <div className="containerWeather">
                    <p>{`${day} de ${month}. Cañuelas, Argentina.`}</p>
                    <img src={iconoAnimado.default} alt="img of climate"/>
                    <p>{weatherInfo.temperature}</p>
                </div>
            )}
        </Fragment>
    )
}


export default Weather