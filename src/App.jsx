import Router from "./Routers/Router.jsx"
import { Fragment } from "react";
import Dolar from "./Components/Dolar/Dolar.jsx"
import Weather from './Components/Weather/Weather.jsx';
import './App.css';


function App() {
  return (
    <Fragment>
      <div className="containerComponent">
        <Dolar />
        <Weather />
      </div>
      <Router />
    </Fragment>
  )
}


export default App