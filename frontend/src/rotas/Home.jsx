import '../rotas/Home.css'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { perfil, resetMessage } from '../slices/useSlice'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import portalColab from '../axios/config'



const Home = () => {
  const dispatch = useDispatch();
    const [publicacoes, setPublicacoes] = useState(null);

    const {user, message, error, loading} = useSelector((state) => state.user || {})

    const [nome, setNome] = useState("");
    const [setor, setSetor] = useState("");
    const [funcao, setFuncao] = useState("");
    const [foto_perfil, setFoto_perfil] = useState("")

    useEffect(() =>{
      dispatch(perfil())
  }, [dispatch]);
  useEffect(() => {
    if (user && user.user) {
     
        setNome(user.user.nome);
        setFuncao(user.user.funcao);
        setSetor(user.user.setor);
        setFoto_perfil(user.user.foto_perfil)
        
      }
    }, [user]);

  
  const handleSubmit = async(e) => {
    e.preventDefault();

    const userData = {
        nome,
    }
    if (foto_perfil) {
        userData.foto_perfil = setFoto_perfil;
        
       
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

    //await dispatch(updateProfile(formData));
  
      setTimeout(() => {
        dispatch(resetMessage());
      }, 2000);
  }
  const handleFoto = (e) =>{
    const image = e.target.files
    setPreVisualizacao(image)
    setFoto_perfil(image)
  }
//Carregando publicações 
    useEffect(() => {
      const carregarPublicacoes = async () => {
          try {
              const res = await portalColab.get("/post");
              console.log(res.data);
              setPublicacoes(res.data);
          } catch (error) {
              console.error("Erro ao carregar publicações:", error);
          }
      };
  
      carregarPublicacoes();
  }, []);


    const toggleMenu = () => {
      setMenuVisible((prevMenuVisible) => !prevMenuVisible);
    };

   
  
    return (
      <div className='home'>
       <Navbar/>
        <div className='flex'>
          <div className="sidebar">
            <div className='card-1'>
              <div>
              {user && user.user && (
                <img src={`http://localhost:3000/${user.user.foto_perfil}`} className='logo' alt='Foto do Usuário' />
              )}
              </div>
              {user && user.user &&(
                <div className='funcao'>
                <p className='name'>{user.user.nome}</p>
                <p>{user.user.funcao}</p>
                <p>{user.user.setor}</p>
                </div>
              )}

            </div>
            <div className='card-2'>
              <Sidebar />
            </div>
          </div>
          <div className='feed'>
        {!publicacoes ? (
          <p>Carregando publicações...</p>
        ) : publicacoes.length === 0 ? (
          <p>Não há publicações no momento, tente novamente mais tarde</p>
  ) : (
    publicacoes.map((publicacao) => (
      <div className='card-feed' key={publicacao.id}>
        <div className="user">
          <img src={`http://localhost:3000/${publicacao.img}`} alt="user" />
          <div className="user-info">
            <h5>{publicacao.usuario}</h5>
            <small>{publicacao.setor}</small>
          </div>
        </div>
        <div className='publi-feed'>
          
          <img src={`http://localhost:3000/${publicacao.img}`}alt={publicacao.titulo} />
          <p>{publicacao.descricao}</p>
        </div>
      </div>
    ))
  )}
</div>
        </div>
      </div>
    );
  }
  
  export default Home;