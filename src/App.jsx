import Router from "./Routers/Router.jsx"
import Dolar from "./Components/Dolar/Dolar.jsx"
import Weather from './Components/Weather/Weather.jsx';
import AuthProvider from "./Context/AuthProvider.jsx";
import './App.css';


function App() {
  return (
    <AuthProvider>
      <div className="containerComponent">
        <Dolar />
        <Weather />
      </div>
      <Router />
    </AuthProvider>
  )
}


export default App