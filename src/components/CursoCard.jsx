import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Componente de Tarjeta de Curso (Presentación)
 * Renderiza la información resumida de un curso.
 * Soporta estilos dinámicos para resaltado por navegación y tematización de colores por categoría.
 */
const CursoCard = ({ 
  curso, 
  agregarAlCarrito, 
  esAdmin, 
  eliminarCurso, 
  iniciarEdicion, 
  colorDestacado, 
  onInteraction,
  bordeColor // Prop para recibir el color temático de la categoría
}) => {
  
  const navigate = useNavigate();

  const formatearPrecio = (precio) => {
    return precio.toLocaleString('es-AR');
  };

  // Definición de estilos dinámicos
  // 1. Estilo para destacado temporal (navegación desde Novedades)
  const estiloDestacado = colorDestacado ? {
    border: `2px solid ${colorDestacado}`,
    boxShadow: `0 0 25px ${colorDestacado}`,
    transform: "scale(1.02)",
    transition: "all 0.5s ease",
    zIndex: 10
  } : {};

  // 2. Estilo base temático (Borde lateral de color según categoría)
  const estiloBorde = bordeColor ? {
    borderLeft: `5px solid ${bordeColor}`
  } : {};

  // Fusión de estilos (el destacado tiene prioridad sobre el borde base)
  const estiloFinal = { ...estiloBorde, ...estiloDestacado };

  const irAlDetalle = () => {
    navigate(`/item/${curso.id}`);
  };

  return (
    <div 
        className="curso-card" 
        data-id={curso.id}
        style={estiloFinal}
        onClickCapture={onInteraction}
    >
      <div className="curso-card-body" onClick={irAlDetalle} style={{cursor: 'pointer'}}>
        <h3>{curso.nombre}</h3>
        <p>{curso.descripcion}</p>
        <div className="curso-meta">
            <span>
                <i className="fa-solid fa-calendar-days"></i> {curso.duracion} ({curso.clases} clases)
            </span>
            <span className="curso-precio">${formatearPrecio(curso.precio)}</span>
        </div>
      </div>
      
      <div className="curso-card-footer">
        <div style={{display: 'flex', gap: '10px'}}>
            
            <button 
                className="button button-info" 
                onClick={irAlDetalle}
                title="Ver Detalles"
                style={{ flexGrow: 1 }} 
            >
                <i className="fa-solid fa-eye"></i> Detalles
            </button>

            {!esAdmin ? (
                <button 
                    className="button button-success" 
                    style={{ flexGrow: 2 }} 
                    onClick={() => agregarAlCarrito(curso)}
                >
                    <i className="fa-solid fa-cart-plus"></i> Añadir
                </button>
            ) : (
                <>
                    <button 
                        className="button button-alt" 
                        style={{ flexGrow: 1 }}
                        onClick={() => iniciarEdicion(curso)}
                    >
                        <i className="fa-solid fa-pencil"></i>
                    </button>
                    
                    <button 
                        className="button button-danger" 
                        style={{ flexGrow: 1 }}
                        onClick={() => eliminarCurso(curso.id)}
                    >
                        <i className="fa-solid fa-trash"></i>
                    </button>
                </>
            )}
        </div>
      </div>
    </div>
  );
};

export default CursoCard;