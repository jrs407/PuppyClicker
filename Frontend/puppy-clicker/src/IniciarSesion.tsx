import React from 'react';
import { useNavigate } from 'react-router-dom';
import './IniciarSesion.css';

const IniciarSesion: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className='fondo'>
        <div className='cuadro-central'>
            <div className='cuadro-central-titulo'>
                <p>Iniciar sesión</p>
            </div>
            
            <div className='cuadro-central-texto-inicio'>
                <p>Usuario</p>
                <input type="text" placeholder="Usuario" className='input' />
                <p>Contraseña</p>
                <input type="password" placeholder="Contraseña" className='input' />
                <button onClick={() => navigate('/home')}>Iniciar sesión</button>         
            </div>
            
            <div className='cuadro-central-texto-registrarse'>
                <p onClick={() => navigate('/Registrarse')}>¿No tienes cuenta? <span>Regístrate</span></p>
            </div>
            
        </div>
    </div>
    
  );
};

export default IniciarSesion;
