import {  Navigate,Routes, Route } from 'react-router-dom';
import { About, Home, Store, Detail } from './views/index.js';
import Navbar from './components/navbar/navbar.jsx';
import Cart from './components/cart/cart.jsx';
import Summary from './components/cart/summary.jsx';
import Failed from './components/cart/failed.jsx';
import Auth from './components/auth/Auth.jsx';
import Profile from './components/profile/Profile.jsx';
import AppdDash from './views/Dashboard/AppDash.jsx'//
import Footer from './components/footer/Footer.jsx'
import { AuthProvider } from "./context/AuthContext.jsx";
import './App.css'
import UnauthorizedPage from './UnauthorizedPage.jsx';
import { useSelector } from 'react-redux';

function App() {
  const logeado = useSelector( s => s.isAuthenticated)

  let userLocal = localStorage.getItem("login");
  userLocal = userLocal ? JSON.parse(userLocal) : null;
  const isAdmin = userLocal?.user?.admin === true;
  const isLoggedIn = logeado || userLocal !== null;
  console.log(userLocal?.user?.admin)
  console.log(userLocal?.user?.name)

  const estilo = {
    'minHeight': '100vh',
  }

  return (
    <div style={estilo}>
      <AuthProvider>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/about' element={<About/>}></Route>
        <Route path='/store' element={<Store/>}></Route>
        <Route path='/detail/:id' element={<Detail/>}></Route>
        <Route path="/cart" element={<Cart/>} />
        <Route path="/cart/summary" element={<Summary/>} />
        <Route path="/cart/failed" element={<Failed/>} />
        <Route path="/auth" element={<Auth/>} />
        <Route path='/user/profile' element={<Profile/>}/>
        {isLoggedIn ? (
            isAdmin ? (
              <Route path='/Dashboard' element={<AppdDash />} />
            ) : (
              // Redirige a otra ruta si el usuario no tiene permisos de administrador
              <Route path='/Dashboard' element={<Navigate to='/unauthorized' />} />
            )
          ) : (
            // Redirige a la página de inicio de sesión si el usuario no está logueado
            <Route path='/Dashboard' element={<Navigate to='/auth' />} />
          )}
          {/* Otra ruta para mostrar un mensaje de "no autorizado" */}
          <Route path='/unauthorized' element={<UnauthorizedPage />} />
      </Routes>
      <Footer/>
      </AuthProvider>
    </div>
  )
}

export default App