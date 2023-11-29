import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './rotas/Home';
import Login from './rotas/Login';
import { useAuth } from './hooks/useAuth';
import EnviarPubli from './rotas/EnviarPubli';
import MeuPerfil from './rotas/MeuPerfil';

function App() {
  const { auth, loading } = useAuth();

  console.log(loading);

  if (loading) {
    return <p>Carregando...</p>
  }

  return (
    <div className="App">
        <Routes>
          <Route path="*" element={auth ? <Home />  : <Navigate to="/login" />} />
          <Route path="/login" element={!auth ? <Login /> : <Navigate to="/"/>} />
          <Route path='/novo/post' element={auth ? <EnviarPubli/> : <Navigate to="/login" />} />
          <Route path='/meu/perfil' element={auth ? <MeuPerfil/> : <Navigate to="/login" />} />
        </Routes>
    </div>
  );
}

export default App;