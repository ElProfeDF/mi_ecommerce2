import React, { useEffect } from 'react';

/**
 * Página de "Próximamente" 
  */
const ProximamentePage = () => {
  
  // Actualización de título para SEO y contexto del usuario
  useEffect(() => {
    document.title = "Próximamente | Mi Faro Digital";
  }, []);

  return (
    <div className="container" style={{ textAlign: 'center', padding: '100px 20px', minHeight: '50vh' }}>
        
        {/* Ícono destacado animado (Rocket) */}
        <div style={{ marginBottom: '30px' }}>
            <i 
                className="fa-solid fa-rocket" 
                style={{ 
                    fontSize: '5rem', 
                    color: '#0d6efd', 
                    filter: 'drop-shadow(0 10px 10px rgba(13, 110, 253, 0.2))'
                }}
            ></i>
        </div>

        <h2 style={{ fontSize: '2.5rem', marginBottom: '20px', fontWeight: '800' }}>
            ¡Estamos preparando algo increíble!
        </h2>
        
        <p style={{ 
            fontSize: '1.2rem', 
            color: '#6c757d', 
            maxWidth: '600px', 
            margin: '0 auto 40px auto',
            lineHeight: '1.6' 
        }}>
            Estamos trabajando en nuevos contenidos de <strong>Robótica Avanzada</strong> e <strong>Inteligencia Artificial Generativa</strong>.
            Muy pronto encenderemos este nuevo faro para vos.
        </p>
        
        {/* Botón de acción simulado */}
        <div>
            <button 
                className="button button-alt" 
                onClick={() => alert("¡Gracias! Te avisaremos a tu correo cuando esté listo.")}
                style={{ padding: '12px 25px', fontSize: '1.1rem' }}
            >
                <i className="fa-regular fa-bell"></i> Avisame cuando esté listo
            </button>
        </div>
    </div>
  );
};

export default ProximamentePage;