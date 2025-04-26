import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import IniciarSesion from './IniciarSesion';
import Registrarse from './Registrarse';
import Clicker from './Clicker';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<IniciarSesion />} />
        <Route path="/Registrarse" element={<Registrarse />} />
        <Route path="/clicker" element={<Clicker />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
