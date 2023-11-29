import imagem from '../assets/login.jpg'
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { login } from "../slices/authSlice"
import '../rotas/Login.css'
import Message from '../components/Message'



const Login = () => {
    
        const [usuario, setUsuario] = useState("")
        const [senha, setSenha] = useState("")
        const dispatch = useDispatch()
        const{error, loading} = useSelector((state) => state.auth || {}) 

        console.log(error)


    const handleSubmit = (e) =>{
        e.preventDefault()

        const user = {
            usuario,
            senha
        }
        dispatch(login(user))
    }


  return (
    <div className='container'>
        <div className="login-container">
            <img src={imagem} className='login-image'/>
            <div className="login-form">
                <h2>PORTAL DO COLABORADOR</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='username'>
                        Usuário:
                    </label>
                    <input 
                    type='text' 
                    id='username'
                    name='usuario'
                    placeholder="Digite o seu usuário"
                    onChange={(e) => setUsuario(e.target.value)}
                    value={usuario|| ""}
                    />
                    <label htmlFor='password'>
                        Senha:
                    </label>
                    <input 
                    type='password' 
                    name='senha'
                    id='password'
                    placeholder="Digite a sua senha"
                    onChange={(e) => setSenha(e.target.value)}
                    value={senha|| ""}
                    />
                    {!loading && <input className='btn-login' type="submit" value="Entrar" />}
                    {loading && <input type="submit" value="Aguarde..." disabled/>}
                    {error && <Message msg={error} type="error" />}
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login