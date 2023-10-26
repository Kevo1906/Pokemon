import './App.css'
import { useEffect, useState } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store'

import Nav from "./components/nav/Nav"
import CreationForm from './components/creationForm/creationForm'
import Form from './components/form/Form'
import Cards from './components/cards/Cards'
import About from './components/about/About'
import Detail from './components/detail/Detail'


function App() {
  const pwd = useLocation()
  const [access, setAccess] = useState(false)
  const navigate = useNavigate()
  // Funcion para entrar a la pagina
  const login = ()=>{
    setAccess(true)
    access && navigate("/home")
  }
  // Funcion para salir de la pagina
  const logout = ()=>{
    setAccess(false)
    navigate("/")
  }

  useEffect(() => {
    !access && navigate("/")
  }, [access])
  
  return (
    <div className='App'>
       <Provider store={store}>
        {pwd.pathname !== "/" ? <Nav logout={logout}/>:null}
     
        <Routes>
        <Route path="/" element={ <Form login={login}/>}/>
        <Route path="/createPokemon" element={ <CreationForm/>}/>
        <Route path="/home" element={ <Cards/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/detail/:id" element={<Detail/>}/>
        
        </Routes>

      </Provider>
    </div>
  )
}

export default App
