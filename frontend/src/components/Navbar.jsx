import logo from '../assets/Logo.png'
import Menuopcoes from '../components/Menuopcoes'
import '../components/Navbar.css'
import { useState, useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { perfil, resetMessage } from '../slices/useSlice'
import portalColab from '../axios/config'

import fotoUsuario from '../assets/Site_baianao.png'
const Navbar = () => {
  const dispatch = useDispatch();
  
  const {user, message, error, loading} = useSelector((state) => state.user || {})
  
  const [foto_perfil, setFoto_perfil] = useState("")

  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() =>{
    dispatch(perfil())
  }, [dispatch])
  useEffect(()=>{
    if (user && user.user) {
        setFoto_perfil(user.user.foto_perfil)
    }
  }, [user])
  
  
  const toggleMenu = () => {
    setMenuVisible((prevMenuVisible) => !prevMenuVisible);
  };

  return (
    <div>
  <nav className="navbar">
    
          <img src={logo} alt="Logo baianao" />
          {user && user.user && (
           <div className='user-profile' onClick={toggleMenu}>
            <img
            src={`http://localhost:3000/${user.user.foto_perfil}`}
            alt="Foto do usuario"
            className='ft-usuario'
            />
            {menuVisible && <Menuopcoes />}
            </div>
          )}

        </nav>
    </div>
  )
}

export default Navbar