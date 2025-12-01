import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import ItemDetail from './ItemDetail';

/**
 * Componente Contenedor 
 * Responsable de la obtención de datos para un producto específico
 * basado en el parámetro ID de la URL.
 */
const ItemDetailContainer = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const { cursos, valorDolar, agregarAlCarrito } = useContext(ShopContext);
  
  const [cursoSeleccionado, setCursoSeleccionado] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    
    // Simulación de latencia de red en la obtención del recurso
    const obtenerProducto = new Promise((resolve) => {
        setTimeout(() => {
            const encontrado = cursos.find(c => c.id === itemId);
            resolve(encontrado);
        }, 500);
    });

    obtenerProducto.then((resultado) => {
        if (resultado) {
            setCursoSeleccionado(resultado);
        } else {
            console.warn(`Producto con ID ${itemId} no encontrado.`);
        }
        setLoading(false);
    });

  }, [itemId, cursos]);

  if (loading) {
    return (
        <div className="container" style={{ padding: '100px', textAlign: 'center' }}>
            <div className="spinner"></div>
            <p>Cargando información del curso...</p>
        </div>
    );
  }

  if (!cursoSeleccionado) {
    return (
        <div className="container" style={{ padding: '50px', textAlign: 'center' }}>
            <h2>Curso no encontrado</h2>
            <p style={{marginBottom: '20px'}}>El curso que buscas no existe o ha sido retirado.</p>
            <button className="button" onClick={() => navigate('/catalogo')}>Volver al Catálogo</button>
        </div>
    );
  }

  return (
    <ItemDetail 
        curso={cursoSeleccionado} 
        valorDolar={valorDolar} 
        onAdd={agregarAlCarrito} 
    />
  );
};

export default ItemDetailContainer;