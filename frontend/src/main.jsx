
import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store.js';
import './index.css';
import App from './App.jsx';
import Home from './rotas/Home.jsx';
import Login from './rotas/Login.jsx';
import EnviarPubli from './rotas/EnviarPubli.jsx';
import MeuPerfil from './rotas/MeuPerfil.jsx';
import { createRoot } from 'react-dom/client';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login/>,
      },
      {
        path: '/novo/post',
        element: <EnviarPubli/>,
      },
      {
        path: 'meu/perfil',
        element: <MeuPerfil/>,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
      </RouterProvider>
    </Provider>
  </React.StrictMode>,
);