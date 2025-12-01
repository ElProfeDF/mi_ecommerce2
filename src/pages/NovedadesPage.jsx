import React, { useEffect, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import HeroSection from '../components/HeroSection';
import NovedadesSection from '../components/NovedadesSection';

/**
 * Página Principal (Home / Novedades)
 * Utiliza el Hero con configuración por defecto (Imagen Institucional).
 */
const NovedadesPage = () => {
  const { cursos } = useContext(ShopContext);
  
  useEffect(() => {
    document.title = "Novedades y Lanzamientos | Mi Faro Digital";
  }, []);

  return (
    <>
      {/* Hero Default: Usa la imagen del aula y el texto institucional */}
      <HeroSection />
      
      <section className="container" style={{ padding: '40px 20px', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '20px', color: '#212529' }}>
                Formación tecnológica con propósito
            </h2>
            <p style={{ fontSize: '1.1rem', color: '#6c757d', lineHeight: '1.8' }}>
                En <strong>Mi Faro Digital</strong> creemos que la tecnología es un medio, no un fin. 
                Nuestros cursos están diseñados para empoderar a educadores, profesionales y curiosos, 
                brindando herramientas prácticas para transformar el presente. Desde la programación 
                hasta la ciudadanía digital, iluminamos el camino hacia el futuro.
            </p>
        </div>
      </section>

      {cursos && cursos.length > 0 ? (
        <NovedadesSection cursos={cursos} />
      ) : (
        <div className="container" style={{padding: '50px', textAlign: 'center'}}>
            <div className="spinner"></div>
            <p style={{marginTop: '20px', color: '#666'}}>Cargando últimas novedades...</p>
        </div>
      )}
    </>
  );
};

export default NovedadesPage;