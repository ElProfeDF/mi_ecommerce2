import React from 'react';

/**
 * Componente de Presentación (Vista de Detalle)
 * Responsable de renderizar la interfaz visual del detalle de un producto.
 * Recibe los datos y funciones mediante props (Patrón Presentational Component).
 */
const ItemDetail = ({ curso, valorDolar, onAdd }) => {
  if (!curso) return null;

  // Cálculo de precios para visualización
  const precioARS = curso.precio.toLocaleString('es-AR');
  const precioUSD = valorDolar 
    ? (curso.precio / valorDolar).toFixed(2) 
    : "---";

  return (
    <div className="item-detail-wrapper">
        {/* Encabezado Inmersivo (Hero) */}
        <div className="detail-hero">
            <div className="container">
                <span className="detail-tag" style={{ color: '#0d6efd', backgroundColor: 'white' }}>
                    {curso.categoria || "Curso Online"}
                </span>
                <h1 style={{ margin: '10px 0' }}>{curso.nombre}</h1>
                <p style={{ opacity: 0.9 }}>ID: {curso.id} | Certificación Incluida</p>
            </div>
        </div>

        {/* Contenedor Principal (Grid 2 columnas) */}
        <div className="detail-container">
            
            {/* Columna Izquierda: Información Detallada */}
            <div className="detail-content">
                <h2 className="detail-title">Lo que aprenderás</h2>
                <p className="detail-description">{curso.descripcion}</p>
                
                <h3>Plan de Estudios</h3>
                <div className="syllabus-container">
                    {/* Generación dinámica de items de temario (simulado) */}
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="syllabus-item">
                            <i className="fa-regular fa-circle-check syllabus-icon"></i>
                            <div>
                                <strong>Módulo {i + 1}:</strong> Fundamentos y Práctica Profesional
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Columna Derecha: Tarjeta de Acción */}
            <aside className="detail-sidebar">
                <div className="purchase-card">
                    <span style={{ textTransform: 'uppercase', fontSize: '0.8rem', color: '#999', letterSpacing: '1px' }}>
                        Precio Final
                    </span>
                    <span className="purchase-price">${precioARS}</span>
                    <span className="purchase-price-usd">Aprox. U$S {precioUSD}</span>

                    <button 
                        className="button button-success" 
                        style={{ width: '100%', padding: '15px', fontSize: '1.1rem' }}
                        onClick={() => onAdd(curso)}
                    >
                        <i className="fa-solid fa-cart-plus"></i> Inscribirme Ahora
                    </button>

                    <ul className="feature-list">
                        <li><i className="fa-solid fa-clock"></i> {curso.duracion} de contenido</li>
                        <li><i className="fa-solid fa-video"></i> {curso.clases} clases en HD</li>
                        <li><i className="fa-solid fa-infinity"></i> Acceso de por vida</li>
                        <li><i className="fa-solid fa-mobile-screen"></i> Acceso en móviles</li>
                        <li><i className="fa-solid fa-trophy"></i> Certificado de finalización</li>
                    </ul>
                </div>
            </aside>

        </div>
    </div>
  );
};

export default ItemDetail;