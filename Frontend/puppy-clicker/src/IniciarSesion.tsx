import React from 'react';
import { useNavigate } from 'react-router-dom';
import './IniciarSesion.css';

const IniciarSesion: React.FC = () => {
  const navigate = useNavigate();
      const [usuario, setUsuario] = React.useState('');
      const [contrasena, setContrasena] = React.useState('');
      const [error, setError] = React.useState('');

      const handleLogin = async () => {
          console.log('Iniciando sesión con:', { usuario, contrasena });
  
          if (!usuario || !contrasena) {
              setError('Todos los campos son obligatorios');
              return;
          }
  
          try {
              console.log('Enviando solicitud a:', 'http://localhost:8080/api/iniciar-sesion');
              const response = await fetch('http://localhost:8080/api/iniciar-sesion', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                      usuario,
                      contrasena
                  }),
              });
  
              let data;
              const contentType = response.headers.get("content-type");
              if (contentType && contentType.indexOf("application/json") !== -1) {
                  data = await response.json();
              } else {
                  data = { error: 'Error en el formato de respuesta del servidor' };
              }
  
              if (response.ok) {
                  navigate('/home');
              } else {
                  setError(data.error || `Error ${response.status}: ${response.statusText}`);
              }
          } catch (error) {
              console.error('Error en el inicio de sesión:', error);
              setError('Error de conexión al servidor. Por favor, intenta más tarde.');
          }
      };

  return (
    <div className='fondo'>
        <div className='cuadro-central'>
            <div className='cuadro-central-titulo'>
                <p>Iniciar sesión</p>
            </div>
            
            <div className='cuadro-central-texto-inicio'>
                <p>Usuario</p>
                <input 
                    type="text" 
                    placeholder="Usuario" 
                    className='input'
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                />
                <p>Contraseña</p>
                <input 
                    type="password" 
                    placeholder="Contraseña" 
                    className='input'
                    value={contrasena}
                    onChange={(e) => setContrasena(e.target.value)}
                />
                <button onClick={handleLogin}>Iniciar sesión</button>
            </div>
            
            <div className='cuadro-central-texto-registrarse'>
                <p onClick={() => navigate('/Registrarse')}>¿No tienes cuenta? <span>Regístrate</span></p>
            </div>

            {error && <p className='mensaje-error'>{error}</p>}
        </div>
    </div>
  );
};

export default IniciarSesion;
