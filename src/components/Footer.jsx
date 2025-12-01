import React from 'react';
import styles from './Footer.module.css';

/**
 * Componente Footer Modularizado
 * Mantiene la identidad visual de la marca utilizando estilos encapsulados.
 */
const Footer = () => {
  return (
    <footer className={styles.footer}>
        <div className={`container ${styles.containerGrid}`}>
            
            <div className={styles.column}>
                <h3 className={styles.title}>Nuestro faro es la pasión por enseñar</h3>
                <p className={styles.text}>
                    Nacimos de la experiencia de más de 20 años en aulas y en desarrollo tecnológico. 
                    Vimos el temor y la distancia que muchos sienten hacia la tecnología y nos propusimos ser una guía. 
                    Nos apasiona ver cómo un usuario, tras pasar por nuestra experiencia, se transforma en un creador con autonomía y confianza.
                </p>
            </div>

            <div className={styles.column}>
                <h3 className={styles.title}>Hablemos de tu proyecto</h3>
                <p className={styles.text}>
                    Contanos tu idea o necesidad. Estamos listos para encontrar la solución tecnológica más eficiente para vos.
                </p>
                
                <div className={styles.buttonGroup}>
                    <a href="mailto:contacto@mifarodigital.com" className={`button ${styles.btnEmail} ${styles.fullWidthButton}`}>
                        <i className="fa-regular fa-envelope"></i> Escribinos un email
                    </a>
                    
                    <a 
                        href="https://wa.me/5491160337316" 
                        className={`button ${styles.btnWhatsapp} ${styles.fullWidthButton}`}
                        target="_blank" 
                        rel="noopener noreferrer"
                    >
                        <i className="fa-brands fa-whatsapp"></i> Contactar por WhatsApp
                    </a>
                </div>
            </div>
        </div>

        <div className={styles.copyright}>
            <p>© 2025 Mi Faro Digital. Todos los derechos reservados.</p>
        </div>
    </footer>
  );
};

export default Footer;