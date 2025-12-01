import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import CursoCard from './CursoCard';
import HeroSection from './HeroSection';

/**
 * Componente Contenedor de Listado 
 * Gestiona el filtrado de productos por categoría y la presentación visual contextuada.
 * Incluye lógica de normalización para mapear URLs (slugs) con datos del catálogo.
 */
const ItemListContainer = () => {
  const { categoryId } = useParams();
  const { cursos, agregarAlCarrito, esAdmin, eliminarCurso, toggleModal } = useContext(ShopContext);
  
  const [itemsFiltrados, setItemsFiltrados] = useState([]);
  const [titulo, setTitulo] = useState("Catálogo Completo");
  const [colorCategoria, setColorCategoria] = useState(null);
  
  // Estado para la configuración dinámica del Hero
  const [heroConfig, setHeroConfig] = useState({
    title: "Catálogo Completo",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1470&auto=format&fit=crop"
  });

  // Normalización de texto para comparaciones seguras 
  const normalizarTexto = (texto) => {
    if (!texto) return "";
    return texto
      .toString()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  };

  const obtenerColorPorCategoria = (slug) => {
    if (!slug) return "#ffc107";
    if (slug.includes("programacion")) return "#0d6efd";
    if (slug.includes("robotica")) return "#dc3545";    
    if (slug.includes("inteligencia")) return "#198754";
    return "#ffc107"; 
  };

  const obtenerRecursosPorCategoria = (slug) => {
    if (!slug) return null;
    
    if (slug.includes("programacion")) return {
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1470&auto=format&fit=crop",
        title: "Programación y Desarrollo"
    };
    if (slug.includes("robotica")) return {
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1470&auto=format&fit=crop",
        title: "Robótica y Hardware"
    };
    if (slug.includes("inteligencia")) return {
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1530&auto=format&fit=crop",
        title: "Inteligencia Artificial"
    };
    if (slug.includes("ciudadania")) return {
        image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1632&auto=format&fit=crop",
        title: "Ciudadanía Digital"
    };
    
    return {
        title: "Catálogo Completo",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1470&auto=format&fit=crop"
    };
  };

  useEffect(() => {
    // Verificación de disponibilidad de datos
    if (!cursos || cursos.length === 0) return;

    if (categoryId) {
        const categoriaSlug = normalizarTexto(categoryId);
        const categoriaURL = categoriaSlug.replace(/-/g, " ");
        
        // Filtrado por coincidencia de categoría normalizada
        const filtrados = cursos.filter(c => 
            c.categoria && normalizarTexto(c.categoria).includes(categoriaURL)
        );
        setItemsFiltrados(filtrados);
        
        // Configuración de UI
        const tituloLegible = categoryId.replace(/-/g, " ");
        setTitulo(`Categoría: ${tituloLegible.charAt(0).toUpperCase() + tituloLegible.slice(1)}`);
        setColorCategoria(obtenerColorPorCategoria(categoriaSlug));

        const recursos = obtenerRecursosPorCategoria(categoriaSlug);
        setHeroConfig(recursos);

    } else {
        // Estado por defecto (Sin filtros)
        setItemsFiltrados(cursos);
        setTitulo("Catálogo Completo");
        setColorCategoria(null);
        setHeroConfig({
            title: "Catálogo Completo",
            image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1470&auto=format&fit=crop"
        });
    }
  }, [categoryId, cursos]);

  return (
    <>
      <HeroSection 
        title={heroConfig.title} 
        image={heroConfig.image}
        subtitle="Explora nuestra oferta académica especializada para potenciar tu perfil profesional."
      />

      <div className="container cursos-section">
        <div className="section-divider">
            <span className="divider-title">{titulo}</span>
            <hr/>
        </div>

        <div className="cursos-grid">
            {itemsFiltrados.length > 0 ? (
                itemsFiltrados.map((curso) => (
                <CursoCard 
                    key={curso.id} 
                    curso={curso} 
                    agregarAlCarrito={agregarAlCarrito}
                    esAdmin={esAdmin}
                    eliminarCurso={eliminarCurso}
                    iniciarEdicion={(c) => toggleModal('editar', c)}
                    bordeColor={colorCategoria}
                />
                ))
            ) : (
                <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#666' }}>
                    {cursos.length === 0 ? (
                        <p>Cargando catálogo...</p>
                    ) : (
                        <p className="mensaje-no-cursos">No se encontraron cursos en esta categoría.</p>
                    )}
                </div>
            )}
        </div>
      </div>
    </>
  );
};

export default ItemListContainer;