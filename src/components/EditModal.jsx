import React, { useState, useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';

/**
 * Componente modal de edición de curso
 * Permite la modificación de los atributos de un curso existente.
 * Recupera el curso seleccionado directamente del estado global.
 */
const EditModal = () => {
  // Extraemos el objeto curso almacenado en el estado del modal 'editar'
  const { modales, toggleModal, guardarCursoEditado } = useContext(ShopContext);
  const curso = modales.editar;

  // Estado local para el formulario
  const [formData, setFormData] = useState({
    id: '',
    nombre: '',
    descripcion: '',
    duracion: '',
    clases: '',
    precio: ''
  });

  // Efecto para poblar el formulario cuando el componente se monta con un curso válido
  useEffect(() => {
    if (curso) {
        setFormData({
            id: curso.id,
            nombre: curso.nombre,
            descripcion: curso.descripcion,
            duracion: curso.duracion,
            clases: curso.clases,
            precio: curso.precio
        });
    }
  }, [curso]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Conversión de tipos para asegurar integridad de datos numéricos
    const cursoActualizado = {
      ...formData,
      clases: parseInt(formData.clases),
      precio: parseFloat(formData.precio)
    };
    guardarCursoEditado(cursoActualizado);
  };

  if (!curso) return null; // Renderizado defensivo

  return (
    <div className="modal-overlay visible">
      <div className="modal-content">
        <h2>Modificar Curso</h2>
        <form onSubmit={handleSubmit}>
            
            <div className="form-group">
                <label>ID</label>
                <input type="text" value={formData.id} disabled style={{backgroundColor: '#e9ecef'}} />
            </div>

            <div className="form-group">
                <label htmlFor="nombre">Nombre</label>
                <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
            </div>

            <div className="form-group">
                <label htmlFor="duracion">Duración</label>
                <input type="text" name="duracion" value={formData.duracion} onChange={handleChange} required />
            </div>

            <div className="form-group">
                <label htmlFor="clases">Clases</label>
                <input type="number" name="clases" value={formData.clases} onChange={handleChange} required />
            </div>

            <div className="form-group">
                <label htmlFor="precio">Precio</label>
                <input type="number" name="precio" value={formData.precio} onChange={handleChange} required />
            </div>

            <div className="form-group">
                <label htmlFor="descripcion">Descripción</label>
                <textarea name="descripcion" rows="3" value={formData.descripcion} onChange={handleChange} required></textarea>
            </div>

            <div className="modal-actions">
                <button type="submit" className="button">Guardar Cambios</button>
                <button 
                    type="button" 
                    onClick={() => toggleModal('editar', null)} // Pasar null cierra y limpia el estado
                    className="button button-alt"
                >
                    Cancelar
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;