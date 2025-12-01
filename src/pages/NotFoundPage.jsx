import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  
  // Actualización del título del documento para SEO y usabilidad
  useEffect(() => {
    document.title = "Página no encontrada | Mi Faro Digital";
  }, []);

  return (
    <div className="container" style={{ textAlign: 'center', padding: '80px 20px' }}>
        <i className="fa-solid fa-triangle-exclamation" style={{ fontSize: '4rem', color: '#ffc107', marginBottom: '20px' }}></i>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>404</h2>
        <h3 style={{ marginBottom: '20px' }}>Página no encontrada</h3>
        <p style={{ color: '#666', maxWidth: '500px', margin: '0 auto 30px auto' }}>
            Lo sentimos, la ruta que intentas acceder no existe o ha sido movida.
        </p>
        
        {/* Enlace de redirección al inicio para recuperación del usuario */}
        <Link to="/" className="button">
            <i className="fa-solid fa-house"></i> Volver al Inicio
        </Link>
    </div>
  );
};

export default NotFoundPage;