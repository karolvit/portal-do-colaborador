import './MeuPefil.css'
import {api} from '../utils/config'
import { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Navbar from '../components/Navbar.jsx'

import { perfil, resetMessage } from '../slices/useSlice'
import Message from '../components/Message.jsx'

const MeuPerfil = () =>{
    const dispatch = useDispatch();

    const {user, message, error, loading} = useSelector((state) => state.user || {})

    
    //stetes dos dados
    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");
    const [setor, setSetor] = useState("");
    const [funcao, setFuncao] = useState("");
    const [fotoPerfil, setFotoPerfil] = useState("")
    const [preVisualizacao, setPreVisualizacao] = useState("")

// Carregando dados do usuario
useEffect(() =>{
    dispatch(perfil())
}, [dispatch]);



useEffect(() => {
    if (user && user.user) {
        setUsuario(user.user.usuario);
        setFuncao(user.user.funcao);
        setSetor(user.user.setor);
      }
    }, [user]);

  
  const handleSubmit = async(e) => {
    e.preventDefault();


    const userData = {
        usuario,
    }
    if (fotoPerfil) {
        userData.fotoPerfil = fotoPerfil;
    }
    if (senha) {
        userData.senha = senha
    }
    if(setor){
        userData.setor = setor
    }
    if(funcao){
        userData.funcao = funcao
        
    }

    const formData = new FormData()

    const userFormData = Object.keys(userData).forEach((key) =>
    formData.append(key, userData[key])
  );
    formData.append("user", userFormData);

    await dispatch(updateProfile(formData));
  
      setTimeout(() => {
        dispatch(resetMessage());
      }, 2000);
  }
  const handleFoto = (e) =>{
    const image = e.target.files
    setPreVisualizacao(image)
    setFotoPerfil(image)
  }
  
  return (
    <div>
     <Navbar/>
    <div className='container-3'>
    <div className="novo-container">
        <div className="envio-form-2">
            <h2>Atualização de dados</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Nome Completo
                </label>
                <input 
                type='text'
                placeholder="Nome Completo"
                onChange={(e) => setUsuario(e.target.value)}
                value={usuario || ""}
                />
                <label>
                    Setor
                </label>
                <input 
                type='text'
                placeholder="Setor"
                onChange={(e) => setSetor(e.target.value)}
                value={setor || ""}
                disabled
                />
                <label>
                    Funçao
                </label>
                <input 
                type='text'
                placeholder="Funcao"
                onChange={(e) => setFuncao(e.target.value)}
                value={funcao || ""}
                disabled
                />

                <span>Envie a imagem:</span>
                <input type='file'  className='img'/>
                <label>
                    Senha
                </label>
                <input 
                type='password'
                placeholder="Digite sua nova senha..."
                onChange={(e) => setSenha(e.target.value)}
                value={senha || ""}
                />
            
            {!loading && <input type="submit" value="Atualizar" />}
            {loading && <input type="submit" disabled value="Aguarde..." />}
            {error && <Message msg={error} type="error" />}
            {message && <Message msg={message} type="success" />}
            </form>
        </div>
    </div>
</div>
</div>
  )
}

export default MeuPerfil