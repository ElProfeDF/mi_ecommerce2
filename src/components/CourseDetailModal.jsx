import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';

/**
 * Componente modal de detalle de curso
 * Muestra información extendida del curso y precios en moneda local y extranjera.
 */
const CourseDetailModal = () => {
  const { 
    modales, 
    toggleModal, 
    valorDolar, 
    agregarAlCarrito 
  } = useContext(ShopContext);

  const curso = modales.detalles;

  if (!curso) return null;

  // Cálculos de presentación
  const precioARS = curso.precio.toLocaleString('es-AR');
  const precioUSD = valorDolar 
    ? (curso.precio / valorDolar).toFixed(2) 
    : "Calculando...";

  return (
    <div className="modal-overlay visible">
      <div className="modal-content modal-detalles-content">
        <button 
            className="modal-close-btn" 
            onClick={() => toggleModal('detalles', null)}
        >
            &times;
        </button>
        
        <h3>{curso.nombre}</h3>
        <p style={{ fontSize: '1.1em', color: '#555' }}>{curso.descripcion}</p>
        
        <div className="curso-meta" style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                <span><i className="fa-solid fa-calendar-days"></i> Duración:</span>
                <strong>{curso.duracion}</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                <span><i className="fa-solid fa-person-chalkboard"></i> Clases:</span>
                <strong>{curso.clases} clases</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>Precio (ARS):</span>
                <span className="curso-precio" style={{ fontSize: '1.5em' }}>${precioARS}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#0d6efd' }}>
                <span>Precio Aprox (USD Blue):</span>
                <span style={{ fontSize: '1.2em', fontWeight: 'bold' }}>
                    {valorDolar ? `U$S ${precioUSD}` : <span style={{fontSize: '0.8em'}}>Consultando cotización...</span>}
                </span>
            </div>

        </div>

        <div className="modal-actions" style={{marginTop: '30px'}}>
            <button 
                className="button button-success" 
                onClick={() => {
                    agregarAlCarrito(curso);
                    toggleModal('detalles', null); // Cierra el modal tras la acción
                }}
            >
                <i className="fa-solid fa-cart-plus"></i> ¡Lo quiero!
            </button>
        </div>

      </div>
    </div>
  );
};

export default CourseDetailModal;