import Router from "./Routers/Router.jsx"
import AuthProvider from "./Context/AuthProvider.jsx";
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  )
}

export default App