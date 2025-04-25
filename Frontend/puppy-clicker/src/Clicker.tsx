import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Clicker.css';

interface LocationState {
    usuario: string;
}

const Clicker: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { usuario } = location.state as LocationState || { usuario: '' };

    React.useEffect(() => {
        if (!usuario) {
            navigate('/login');
        }
    }, [usuario, navigate]);

    return (
        <div className ='fondo'>
            <div className = "primer-tercio">
                <div className='primer-tercio-parte-superior'>
                    <button className='cerrar-sesion' onClick={() => navigate('/login')}>Cerrar sesion</button>
                </div>
                <div className='primer-tercio-parte-central'>
                    <p className='titulo'>¡Bienvenido {usuario}!</p>
                </div>
            </div>

            <div className = "segundo-tercio">
                <div className= 'parte-central'>
                    <div className='contador-clicker'>
                        <p className='numero-clicker'>857939573</p>
                    </div>
                    <div className='segundo-tercio-central'>
                        <div className='boton-clicker'></div>
                    </div>
                </div>
            </div>

            <div className = "tercer-tercio">
            </div>

        </div>
        
    );
}

export default Clicker;