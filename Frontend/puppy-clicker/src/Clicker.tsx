import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Clicker.css';

interface LocationState {
    userData: {
        idUsuario: number;
        usuario: string;
        puntos: number;
    };
}

const Clicker: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { userData } = location.state as LocationState || { 
        userData: { 
            idUsuario: 0,
            usuario: '',
            puntos: 0
        } 
    };

    React.useEffect(() => {
        if (!userData?.usuario) {
            navigate('/login');
        }
    }, [userData, navigate]);

    return (
        <div className='fondo'>
            <div className="primer-tercio">
                <div className='primer-tercio-parte-superior'>
                    <button className='cerrar-sesion' onClick={() => navigate('/login')}>Cerrar sesion</button>
                </div>
                <div className='primer-tercio-parte-central'>
                    <p className='titulo'>¡Bienvenido {userData?.usuario}!</p>
                </div>
            </div>

            <div className = "segundo-tercio">
                <div className= 'parte-central'>
                    <div className='contador-clicker'>
                        <p className='numero-clicker'>{userData?.puntos}</p>
                    </div>
                    <div className='segundo-tercio-central'>
                        <div className='boton-clicker'></div>
                    </div>
                </div>
            </div>

            <div className = "tercer-tercio">
                <div className='tercer-tercio-parte-superior'>
                    <div className='tercer-tercio-parte-superior-titulo'>
                        <p> Mejoras </p>
                    </div>

                    <div className = 'tercer-tercio-parte-superior-mejoras'>
                        {[...Array(18)].map((_, index) => (
                            <div key={index} className="mejora-item" />
                        ))}
                    </div>
                </div>
            </div>

        </div>
        
    );
}

export default Clicker;