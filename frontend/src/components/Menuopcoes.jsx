import "./Menuopcoes.css"
import { FaUserCircle } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { useAuth } from '../hooks/useAuth'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import {logout, reset} from '../slices/authSlice'
const Menuopcoes = () => {
  const {auth} = useAuth();
  const {user} = useSelector((state) =>state.auth)
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const handleLogout = () =>{
    dispatch(logout())
    dispatch(reset())

    navigate("/login")
  }

  return (
    <div className="menu-opcoes">
      <ul>
        {auth && (
          <>
          <li>
        <NavLink to={"/meu/perfil"}>
          <FaUserCircle />Meu Perfil
          </NavLink>
          </li>
          </>
        )}
        <li className="sair" onClick={handleLogout}><IoLogOut />Sair</li>
      </ul>
    </div>
  );
};

export default Menuopcoes;