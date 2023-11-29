import { Link, NavLink, useNavigate } from 'react-router-dom'
import '../rotas/EnviarPubli.css'
import Navbar from '../components/Navbar'
import { useState } from 'react'
const EnviarPubli = () => {
    const [selectedSetores, setSelectedSetores] = useState([]);
    const setoresOptions = ['DP', 'TI', 'RH', 'Facilites', 'Retenção', ];
  
    const handleSetoresChange = (e) => {
      const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
      setSelectedSetores(selectedOptions);
    }
  return (
    <div>
        <Navbar/>
    <div className='container-2'>
    <div className="novo-container">
        <div className="envio-form">
            <h2>Envie sua publicação</h2>
            <form>
                <label>
                    Titulo:
                </label>
                <input 
                type='text' 
                placeholder="Digite o titulo da sua publicação"
                />
                <label>
                    Descrição:
                </label>
                <textarea
                type='text' 
                />
                 <label className='img'>
                <span>Envie a imagem:</span>
                <input type='file'className='img'/>
            </label>
            <div className='seletores'>
            <label>
                Escolha os setores:
              </label>
              <select
                multiple
                value={selectedSetores}
                onChange={handleSetoresChange}
              >
                {setoresOptions.map((setor) => (
                  <option key={setor} value={setor}>
                    {setor}
                  </option>
                ))}
              </select>
              </div>
               <input className='btn' type="submit" value="Enviar" />
               
            </form>
        </div>
    </div>
</div>
</div>
  )
}

export default EnviarPubli