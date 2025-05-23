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

import pugIcon from './assets/iconoEdificio/pug.png';
import chihuahuaIcon from './assets/iconoEdificio/chihuahua.png';
import retrieverIcon from './assets/iconoEdificio/retriever.png';
import huskyIcon from './assets/iconoEdificio/husky.png';
import pomeranianIcon from './assets/iconoEdificio/pomeranian.png';
import poodleIcon from './assets/iconoEdificio/poodle.png';
import terrierIcon from './assets/iconoEdificio/terrier.png';
import collieIcon from './assets/iconoEdificio/collie.png';
import shibaIcon from './assets/iconoEdificio/shiba.png';


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

interface Mejora {
    idMejoras: number;
    nombre: string;
    descripcion: string;
    precio: string;
    nombrePNG: string;
    categoria: number;
    tipoMejora: string;
}

interface MejoraComprada {
    idMejoras: number;
    nombre: string;
    categoria: number;
    tipoMejora: string;
}

const Clicker: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [clickImages, setClickImages] = useState<ClickImage[]>([]);
    const [puntos, setPuntos] = useState(0);
    const [descripcionAleatoria, setDescripcionAleatoria] = useState('¡Bienvenido!');
    const [edificios, setEdificios] = useState<Edificio[]>([]);
    const [mejoras, setMejoras] = useState<Mejora[]>([]);
    const [mejorasCompradas, setMejorasCompradas] = useState<MejoraComprada[]>([]);
    const { userData } = location.state as LocationState || { 
        userData: { 
            idUsuario: 0,
            usuario: '',
            puntos: 0
        } 
    };
    const [hoveredId, setHoveredId] = useState<number | null>(null);
    const [produccionPorSegundo, setProduccionPorSegundo] = useState(0);
    const [dogImage, setDogImage] = useState<string>('https://i.pinimg.com/736x/f9/c5/9a/f9c59a1139f2ddf1f36ffc702f4b1d0e.jpg');
    const [lastFetch, setLastFetch] = useState<number>(0);
    const FETCH_DELAY = 1000;

    const throttledFetchDog = async () => {
        const now = Date.now();
        if (now - lastFetch >= FETCH_DELAY) {
            await fetchRandomDog();
            setLastFetch(now);
        }
    };

    const fetchRandomDog = async () => {
        try {
            const response = await fetch('https://dog.ceo/api/breeds/image/random');
            const data = await response.json();
            if (data.status === 'success') {
                setDogImage(data.message);
            }
        } catch (error) {
            console.error('Error fetching dog image:', error);
            // Si falla, se mantiene la imagen placeholder actual
        }
    };

    const obtenerDescripcionAleatoria = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/descripciones');
            const data = await response.json();
            
            if (data.success && data.descripciones && data.descripciones.length > 0) {
                const randomIndex = Math.floor(Math.random() * data.descripciones.length);
                setDescripcionAleatoria(data.descripciones[randomIndex].descripcion);
            } else {
                console.error('Error al obtener descripción:', data.error);
                setDescripcionAleatoria('¡Bienvenido!');
            }
        } catch (error) {
            console.error('Error al obtener descripción:', error);
            setDescripcionAleatoria('¡Bienvenido!');
        }
    };

    // Nuevo useEffect para actualizar descripciones cada 10 segundos
    React.useEffect(() => {
        // Obtener la primera descripción al montar el componente
        obtenerDescripcionAleatoria();

        // Configurar el intervalo para actualizar cada 10 segundos
        const intervalo = setInterval(obtenerDescripcionAleatoria, 10000);

        // Limpiar el intervalo cuando el componente se desmonte
        return () => clearInterval(intervalo);
    }, []); // Array vacío para que solo se ejecute al montar el componente

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

    const cargarMejoras = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/mejoras/${userData.idUsuario}`);
            const data = await response.json();
            
            if (data.success) {
                const mejorasOrdenadas = data.mejoras.sort((a: Mejora, b: Mejora) => {
                    return parseInt(a.precio) - parseInt(b.precio);
                });
                setMejoras(mejorasOrdenadas);
            } else {
                console.error('Error al cargar mejoras:', data.error);
            }
        } catch (error) {
            console.error('Error al cargar mejoras:', error);
        }
    };

    const cargarMejorasCompradas = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/mejoras-compradas/${userData.idUsuario}`);
            const data = await response.json();
            
            if (data.success) {
                setMejorasCompradas(data.mejoras);
            } else {
                console.error('Error al cargar mejoras compradas:', data.error);
            }
        } catch (error) {
            console.error('Error al cargar mejoras compradas:', error);
        }
    };

    const calcularMultiplicadoresPorTipo = () => {
        const multiplicadores: { [key: string]: number } = {};
        
        mejorasCompradas.forEach(mejora => {
            // Inicializar multiplicador si no existe
            if (!multiplicadores[mejora.tipoMejora]) {
                multiplicadores[mejora.tipoMejora] = 1;
            }
            // Cada mejora duplica la producción
            multiplicadores[mejora.tipoMejora] *= 2;
        });
        
        return multiplicadores;
    };

    const calcularProduccionTotal = (edificios: Edificio[]): number => {
        const multiplicadores = calcularMultiplicadoresPorTipo();
        
        return edificios.reduce((total, edificio) => {
            const multiplicador = multiplicadores[edificio.raza] || 1;
            return total + (edificio.produccionInicial * edificio.numeroComprado * multiplicador);
        }, 0);
    };

    const actualizarPuntos = async (puntosGenerados: number) => {
        if (puntosGenerados <= 0) return;
        
        try {
            const response = await fetch('http://localhost:8080/api/actualizar-puntos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    idUsuario: userData.idUsuario,
                    puntos: puntosGenerados
                }),
            });

            if (!response.ok) {
                console.error('Error al actualizar puntos');
            }
        } catch (error) {
            console.error('Error al actualizar puntos:', error);
        }
    };

    React.useEffect(() => {
        if (!userData?.usuario) {
            navigate('/login');
            return;
        }
        setPuntos(userData?.puntos || 0);
        
        cargarEdificios();
        cargarMejoras();
        cargarMejorasCompradas();
        obtenerDescripcionAleatoria();
    }, [userData, navigate]);

    React.useEffect(() => {
        setProduccionPorSegundo(calcularProduccionTotal(edificios));
    }, [edificios, mejorasCompradas]); // Añadir mejorasCompradas como dependencia

    React.useEffect(() => {
        if (produccionPorSegundo <= 0) return;

        const intervalo = setInterval(() => {
            const puntosGenerados = produccionPorSegundo;
            setPuntos(prev => prev + puntosGenerados);

            actualizarPuntos(puntosGenerados);
        }, 1000);

        return () => {
            clearInterval(intervalo);
        };
    }, [produccionPorSegundo]);

    const calcularMultiplicadorClick = (): number => {
        return mejorasCompradas
            .filter(mejora => mejora.tipoMejora === 'click')
            .reduce((mult) => mult * 2, 1);
    };

    const registrarClick = async () => {
        try {
            const multiplicadorClick = calcularMultiplicadorClick();
            const response = await fetch('http://localhost:8080/api/click', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    idUsuario: userData.idUsuario,
                    multiplicador: multiplicadorClick
                }),
            });

            if (response.ok) {
                setPuntos(prev => prev + multiplicadorClick);
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
        await throttledFetchDog();
        
        setTimeout(() => {
            setClickImages(prev => prev.filter(click => click.id !== newClick.id));
        }, 1500);
    };

    const calcularPrecioEdificio = (precioInicial: number, numeroComprado: number): number => {
        return Math.floor(precioInicial * Math.pow(1.15, numeroComprado));
    };

    const comprarEdificio = async (edificio: Edificio) => {
        const precioActual = calcularPrecioEdificio(edificio.precioInicial, edificio.numeroComprado);
        
        if (puntos < precioActual) {
            console.log('No hay suficientes puntos');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/comprar-edificio', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    idUsuario: userData.idUsuario,
                    idEdificio: edificio.idEdificios
                }),
            });

            const data = await response.json();
            
            if (data.success) {
                setPuntos(data.puntos);
                setEdificios(edificios.map(e => 
                    e.idEdificios === edificio.idEdificios 
                        ? { ...e, numeroComprado: data.numeroComprado }
                        : e
                ));
            } else {
                console.error('Error al comprar edificio:', data.error);
            }
        } catch (error) {
            console.error('Error al comprar edificio:', error);
        }
    };

    const comprarMejora = async (mejora: Mejora) => {
        const precioMejora = parseInt(mejora.precio);
        
        if (puntos < precioMejora) {
            console.log('No hay suficientes puntos');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/comprar-mejora', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    idUsuario: userData.idUsuario,
                    idMejora: mejora.idMejoras
                }),
            });

            const data = await response.json();
            
            if (data.success) {
                setPuntos(data.puntos);
                setMejoras(mejoras.filter(m => m.idMejoras !== mejora.idMejoras));
                // Recargar las mejoras compradas para actualizar los multiplicadores
                await cargarMejorasCompradas();
            } else {
                console.error('Error al comprar mejora:', data.error);
            }
        } catch (error) {
            console.error('Error al comprar mejora:', error);
        }
    };

    const getEdificioIcon = (raza: string): string => {
        const iconMap: { [key: string]: string } = {
            'pug': pugIcon,
            'chihuahua': chihuahuaIcon,
            'poodle': poodleIcon,
            'retriever': retrieverIcon,
            'pomeranian': pomeranianIcon,
            'collie': collieIcon,
            'husky': huskyIcon,
            'shiba': shibaIcon,
            'terrier': terrierIcon
        };
        return iconMap[raza.toLowerCase()] || '';
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
                    <p className='descripcion'>{descripcionAleatoria}</p>
                </div>
            </div>

            <div className = "segundo-tercio">
                <div className= 'parte-central'>
                    <div className='contador-clicker'>
                        <p className='numero-clicker'>{puntos}</p>
                        <p className='produccion-actual'>{produccionPorSegundo} por segundo</p>
                    </div>
                    <div className='segundo-tercio-central'>
                        <div 
                            className='boton-clicker' 
                            onClick={handleClick}
                            style={{
                                backgroundImage: `url("${dogImage}")`,
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
                        {mejoras.map((mejora) => {
                            const puedeComprar = puntos >= parseInt(mejora.precio);
                            return (
                                <div 
                                    key={mejora.idMejoras} 
                                    className="mejora-item"
                                    onClick={() => puedeComprar && comprarMejora(mejora)}
                                    style={{
                                        cursor: puedeComprar 
                                            ? 'url("/src/assets/Cursor2.png"), pointer' 
                                            : 'url("/src/assets/Cursor1.png"), not-allowed',
                                        opacity: puedeComprar ? 1 : 0.6
                                    }}
                                >
                                    <img 
                                        src={`/src/assets/iconoMejora/${mejora.nombrePNG}.png`}
                                        alt={mejora.nombre}
                                        title={`${mejora.nombre}\n${mejora.descripcion}\nPrecio: ${mejora.precio}`}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'contain'
                                        }}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className='lista-edificios'>
                    {edificios.map((edificio) => {
                        const precioActual = calcularPrecioEdificio(edificio.precioInicial, edificio.numeroComprado);
                        const puedeComprar = puntos >= precioActual;
                        return (
                            <div
                                key={edificio.idEdificios}
                                className="edificio"
                                onClick={() => comprarEdificio(edificio)}
                                onMouseEnter={() => setHoveredId(edificio.idEdificios)}
                                onMouseLeave={() => setHoveredId(null)}
                                style={{
                                    backgroundColor:
                                        puedeComprar
                                            ? (hoveredId === edificio.idEdificios 
                                                ? '#5E503E' 
                                                : '#463A2F') 
                                            : '#332B24',
                                    cursor: puedeComprar 
                                        ? 'url("/src/assets/Cursor2.png"), pointer' 
                                        : 'url("/src/assets/Cursor1.png"), not-allowed',
                                    transition: 'background-color 0.2s ease'
                                }}
                            >
                                <div className="edificio-imagen" style={{
                                    backgroundImage: `url(${getEdificioIcon(edificio.raza)})`,
                                    backgroundSize: 'contain',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat'
                                }}></div>
                                <div className="edificio-info">
                                    <p className="edificio-nombre">{edificio.nombre}</p>
                                    <p className="edificio-coste" style={{
                                        color: puedeComprar ? '#4CAF50' : '#FF5252'
                                    }}>
                                        {calcularPrecioEdificio(edificio.precioInicial, edificio.numeroComprado)}
                                    </p>
                                </div>
                                <span className="edificio-cantidad">{edificio.numeroComprado}</span>
                            </div>
                        );
                    })}
                </div>
            </div>

        </div>
        
    );
}

export default Clicker;