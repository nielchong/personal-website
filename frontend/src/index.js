import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import AHapi from './Pages/AHapi/AHapi';
import Logout from './Pages/Logout/Logout';
import Welcome from './Pages/Welcome/Welcome';
import Restricted from './Pages/Restricted/Restricted';
import Register from './Pages/Registration/Registration';
import { AuthProvider } from './Context/AuthContext';
import AuthRoute from './Components/AuthRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />, 
  },
  {
    path: '/login',
    element: <Login />, 
  },
  {
    path: '/ahapi',
    element: <AHapi />, 
  },
  {
    path: '/logout',
    element: <Logout />, 
  },
  {
    path: '/register',
    element: <Register />, 
  },
  {
    path: '/welcome',
    element: <AuthRoute element={<Welcome />} />, 
  },
  {
    path: '/restricted',
    element: <AuthRoute element={<Restricted />} />, 
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <AuthProvider>
        <RouterProvider router = {router}></RouterProvider>
    </AuthProvider>
  </React.StrictMode>
);