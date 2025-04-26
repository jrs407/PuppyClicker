import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Clicker.css';

import click1 from './assets/clicks/click1.png';
import click2 from './assets/clicks/click2.png';
import click3 from './assets/clicks/click3.png';
import click4 from './assets/clicks/click4.png';
import click5 from './assets/clicks/click5.png';
import click6 from './assets/clicks/click6.png';
import click7 from './assets/clicks/click7.png';
import click8 from './assets/clicks/click8.png';
import click9 from './assets/clicks/click9.png';
import click10 from './assets/clicks/click10.png';

interface LocationState {
    userData: {
        idUsuario: number;
        usuario: string;
        puntos: number;
    };
}

interface ClickImage {
    id: number;
    x: number;
    y: number;
    src: string;
}

interface Edificio {
    idEdificios: number;
    nombre: string;
    raza: string;
    precioInicial: number;
    produccionInicial: number;
    numeroComprado: number;
}

const Clicker: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [clickImages, setClickImages] = useState<ClickImage[]>([]);
    const [puntos, setPuntos] = useState(0);
    const [edificios, setEdificios] = useState<Edificio[]>([]);
    const { userData } = location.state as LocationState || { 
        userData: { 
            idUsuario: 0,
            usuario: '',
            puntos: 0
        } 
    };

    const cargarEdificios = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/edificios/${userData.idUsuario}`);
            const data = await response.json();
            
            if (data.success) {
                setEdificios(data.edificios);
            } else {
                console.error('Error al cargar edificios:', data.error);
            }
        } catch (error) {
            console.error('Error al cargar edificios:', error);
        }
    };

    React.useEffect(() => {
        if (!userData?.usuario) {
            navigate('/login');
        }
        setPuntos(userData?.puntos || 0);
        cargarEdificios();
    }, [userData, navigate]);

    const registrarClick = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/click', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    idUsuario: userData.idUsuario
                }),
            });

            if (response.ok) {
                setPuntos(prev => prev + 1);
            }
        } catch (error) {
            console.error('Error al registrar click:', error);
        }
    };

    const handleClick = async (e: React.MouseEvent) => {
        const clickImages = [click1, click2, click3, click4, click5, click6, click7, click8, click9, click10];
        const randomImage = clickImages[Math.floor(Math.random() * clickImages.length)];
        
        const newClick: ClickImage = {
            id: Date.now(),
            x: e.clientX,
            y: e.clientY,
            src: randomImage
        };

        setClickImages(prev => [...prev, newClick]);
        await registrarClick();
        
        setTimeout(() => {
            setClickImages(prev => prev.filter(click => click.id !== newClick.id));
        }, 1500);
    };

    return (
        <div className='fondo'>
            {clickImages.map(click => (
                <img
                    key={click.id}
                    src={click.src}
                    className="click-image"
                    style={{
                        left: click.x,
                        top: click.y
                    }}
                />
            ))}
            
            <div className="primer-tercio">
                <div className='primer-tercio-parte-superior'>
                    <button className='cerrar-sesion' onClick={() => navigate('/login')}>Cerrar sesion</button>
                </div>
                <div className='primer-tercio-parte-central'>
                    <p className='descripcion'>¡Bienvenido {userData?.usuario}!</p>
                </div>
            </div>

            <div className = "segundo-tercio">
                <div className= 'parte-central'>
                    <div className='contador-clicker'>
                        <p className='numero-clicker'>{puntos}</p>
                    </div>
                    <div className='segundo-tercio-central'>
                        <div 
                            className='boton-clicker' 
                            onClick={handleClick}
                            style={{
                                backgroundImage: 'url("https://i1.sndcdn.com/artworks-x8zI2HVC2pnkK7F5-4xKLyA-t1080x1080.jpg")',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}
                        ></div>
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

                <div className='lista-edificios'>
                    {edificios.map((edificio) => (
                        <div key={edificio.idEdificios} className="edificio">
                            <div className="edificio-imagen"></div>
                            <div className="edificio-info">
                                <p className="edificio-nombre">{edificio.nombre}</p>
                                <p className="edificio-coste">{edificio.precioInicial}</p>
                            </div>
                            <span className="edificio-cantidad">{edificio.numeroComprado}</span>
                        </div>
                    ))}
                </div>
            </div>

        </div>
        
    );
}

export default Clicker;