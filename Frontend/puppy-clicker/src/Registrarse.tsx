import React from 'react';
import { useNavigate } from 'react-router-dom';
import './IniciarSesion.css';

const Registrarse: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className='fondo'>
        <div className='cuadro-central'>
            <div className='cuadro-central-titulo'>
                <p>Registrarse</p>
            </div>
            
            <div className='cuadro-central-texto-registro'>
                <p>Usuario</p>
                <input type="text" placeholder="Usuario" className='input' />
                <p>Contraseña</p>
                <input type="password" placeholder="Contraseña" className='input' />
                <p>Confirmar contraseña</p>
                <input type="password" placeholder="Confirmar contraseña" className='input' />
                <button onClick={() => navigate('/home')}>Registrarse</button>         
            </div>
            
            <div className='cuadro-central-texto-registrarse'>
                <p onClick={() => navigate('/login')}>¿Ya tienes cuenta? <span>Inicia sesión</span></p>
            </div>
            
        </div>
    </div>
  );
};

export default Registrarse;
