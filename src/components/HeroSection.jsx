import React from 'react';

/**
 * Componente Hero (Portada Dinámica)
 * Renderiza una sección de encabezado con imagen de fondo y texto personalizable.
 * Permite adaptar la identidad visual según la sección activa (Home, Categorías, etc.).
 * * @param {string} title - Título principal de la sección.
 * @param {string} subtitle - Subtítulo descriptivo.
 * @param {string} image - URL de la imagen de fondo.
 */
const HeroSection = ({ 
    title = "Ilumina tu potencial digital", 
    subtitle = "Descubre el camino hacia nuevas habilidades con nuestro catálogo de cursos diseñados para transformar tu futuro profesional.",
    image = "https://images.unsplash.com/photo-1610484826917-0f101a7bf7f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
}) => {
  
  // Estilo en línea para aplicar la imagen dinámica con el gradiente superpuesto
  const backgroundStyle = {
    backgroundImage: `linear-gradient(rgba(13, 110, 253, 0.5), rgba(33, 37, 41, 0.7)), url('${image}')`
  };

  return (
    <section className="hero-section" style={backgroundStyle}>
        <div className="container hero-content">
            <h2>{title}</h2>
            <p>{subtitle}</p>
        </div>
    </section>
  );
};

export default HeroSection;