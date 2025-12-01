import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Componente Utilitario de Navegación
 * * Se encarga de restablecer la posición de desplazamiento (scroll) 
 * * de la ventana a la parte superior (coordenadas 0,0) cada vez que
 * * se detecta un cambio en la ruta activa (pathname).
 * * Mejora la experiencia de usuario en aplicaciones de página única (SPA).
 */
const ScrollToTop = () => {
  // Hook para detectar la ruta actual
  const { pathname } = useLocation();

  useEffect(() => {
    // Ejecuta el desplazamiento suave hacia el inicio
    window.scrollTo(0, 0);
  }, [pathname]); // Dependencia: se dispara al cambiar la ruta

  return null; // Este componente no renderiza elementos visuales
};

export default ScrollToTop;