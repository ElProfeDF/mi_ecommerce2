import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Sub-componente NovedadCard
 * Implementa una tarjeta interactiva para destacar lanzamientos.
 */
const NovedadCard = ({ curso }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const navigate = useNavigate();

  // Asignación de paleta de colores por categoría
  const getColorCategoria = (cat) => {
    if (cat.includes("Programación")) return "#0d6efd"; 
    if (cat.includes("Robótica")) return "#dc3545";     
    if (cat.includes("Inteligencia")) return "#198754"; 
    return "#ffc107"; 
  };

  const colorTema = getColorCategoria(curso.categoria);
  
  // Navegación con paso de estado para resaltar el item destino
  const irAlCurso = (e) => {
    e.stopPropagation();
    navigate(`/item/${curso.id}`, { 
        state: { 
            idCursoDestacado: curso.id,
            colorDestacado: colorTema 
        } 
    });
  };

  return (
    <div 
        className={`flip-card ${isFlipped ? 'flipped' : ''}`} 
        onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <div className="nuevo-badge" style={{ backgroundColor: colorTema }}>
            <i className="fa-solid fa-bolt"></i> NUEVO CURSO
          </div>
          <h3 style={{color: '#333'}}>{curso.nombre}</h3>
          <span 
            className="btn-categoria" 
            style={{ 
                backgroundColor: '#f8f9fa', 
                color: '#666',
                border: '1px solid #ddd',
                marginTop: 'auto' 
            }}
          >
            {curso.categoria}
          </span>
          <p style={{marginTop: '15px', fontSize: '0.8rem', color: '#888'}}>
            <i className="fa-regular fa-hand-pointer"></i> Click para girar
          </p>
        </div>

        <div 
            className="flip-card-back"
            style={{ backgroundColor: colorTema, color: curso.categoria.includes("Ciudadanía") ? '#333' : '#fff' }}
        >
          <h4>{curso.nombre}</h4>
          <p style={{fontSize: '0.9rem', margin: '15px 0'}}>{curso.descripcion}</p>
          <p><strong>Salida:</strong> {new Date(curso.fecha).toLocaleDateString()}</p>
          
          <button 
            className="button" 
            style={{ 
                backgroundColor: '#fff', 
                color: '#333', 
                marginTop: '15px',
                border: 'none'
            }}
            onClick={irAlCurso}
          >
            Ver Detalle <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * Sección de Novedades
 * Filtra los cursos más recientes por fecha de lanzamiento.
 */
const NovedadesSection = ({ cursos }) => {
  const ultimasNovedades = [...cursos]
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
    .slice(0, 6);

  return (
    <section id="novedades" className="container" style={{ marginBottom: '60px' }}>
        <div className="section-divider">
            <span className="divider-title">Últimas Novedades</span>
            <hr/>
        </div>
        <div className="novedades-grid">
            {ultimasNovedades.map(curso => (
                <NovedadCard key={curso.id} curso={curso} />
            ))}
        </div>
    </section>
  );
};

export default NovedadesSection;