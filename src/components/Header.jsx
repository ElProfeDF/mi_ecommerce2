import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import logoMFD from '../assets/logo mi faro digital centrado.png';
import styles from './Header.module.css';

/**
 * Componente header con navegación
 * Configuración de enlaces a categorías normalizada 
 */
const Header = () => {
  const location = useLocation();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [dropdownAbierto, setDropdownAbierto] = useState(false);
  const dropdownRef = useRef(null);

  const { totalItems, toggleModal, esAdmin, cerrarSesion } = useContext(ShopContext);

  const isActiveClass = (path) => location.pathname.includes(path) ? styles.active : '';
  
  const cerrarTodo = () => {
    setMenuAbierto(false);
    setDropdownAbierto(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownAbierto(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className={styles.header}>
        <div className={`container ${styles.flexContainer}`}>
            
            <div className={styles.logo}>
                <Link to="/" onClick={cerrarTodo}>
                    <img src={logoMFD} alt="Logo Mi Faro Digital" />
                </Link>
            </div>

            <button 
                className={styles.navToggle} 
                onClick={() => setMenuAbierto(!menuAbierto)}
                aria-label="Menú"
            >
                <i className={`fa-solid ${menuAbierto ? 'fa-xmark' : 'fa-bars'}`}></i>
            </button>

            <nav className={`${styles.nav} ${menuAbierto ? styles.visible : ''}`}>
                <ul>
                    <li>
                        <Link to="/" className={`${styles.navLink} ${isActiveClass('/') === styles.active && location.pathname === '/' ? styles.active : ''}`} onClick={cerrarTodo}>
                            Novedades
                        </Link>
                    </li>
                    
                    <li 
                        className={styles.dropdownContainer} 
                        ref={dropdownRef}
                        onMouseEnter={() => window.innerWidth > 768 && setDropdownAbierto(true)}
                        onMouseLeave={() => window.innerWidth > 768 && setDropdownAbierto(false)}
                    >
                        <div 
                            className={`${styles.navLink} ${isActiveClass('/categoria')} ${isActiveClass('/catalogo')}`}
                            onClick={() => setDropdownAbierto(!dropdownAbierto)}
                            aria-haspopup="true"
                            aria-expanded={dropdownAbierto}
                        >
                            Catálogo de Cursos <i className={`fa-solid fa-chevron-down ${styles.dropdownIcon}`}></i>
                        </div>

                        <div className={`${styles.dropdownMenu} ${dropdownAbierto ? styles.show : ''}`}>
                            <Link to="/catalogo" className={styles.dropdownItem} onClick={cerrarTodo}>
                                <strong>Ver Todo el Catálogo</strong>
                            </Link>
                            {/* Enlaces con slugs normalizados (con guiones) */}
                            <Link to="/categoria/programacion" className={styles.dropdownItem} onClick={cerrarTodo}>
                                Programación
                            </Link>
                            <Link to="/categoria/robotica" className={styles.dropdownItem} onClick={cerrarTodo}>
                                Robótica
                            </Link>
                            <Link to="/categoria/inteligencia-artificial" className={styles.dropdownItem} onClick={cerrarTodo}>
                                Inteligencia Artificial
                            </Link>
                            <Link to="/categoria/ciudadania-digital" className={styles.dropdownItem} onClick={cerrarTodo}>
                                Ciudadanía Digital
                            </Link>
                        </div>
                    </li>

                    <li>
                        <Link to="/proximamente" className={`${styles.navLink} ${isActiveClass('/proximamente')}`} onClick={cerrarTodo}>
                            Próximamente
                        </Link>
                    </li>
                </ul>
            </nav>
            
            <div className={styles.userActions}>
                {!esAdmin ? (
                    <button id="btn-login" className="button button-alt" onClick={() => { toggleModal('login', true); cerrarTodo(); }}>
                        <i className="fa-solid fa-user-shield"></i>
                        <span className={styles.desktopOnly}> Login</span>
                    </button>
                ) : (
                    <button id="btn-logout" className="button button-danger" onClick={() => { cerrarSesion(); cerrarTodo(); }}>
                        <i className="fa-solid fa-right-from-bracket"></i>
                        <span className={styles.desktopOnly}> Salir</span>
                    </button>
                )}
                
                <div className={styles.carritoContainer} onClick={() => { toggleModal('carrito', true); cerrarTodo(); }}>
                    <i className="fa-solid fa-cart-shopping"></i>
                    <span className={styles.carritoBadge}>{totalItems}</span>
                </div>
            </div>
        </div>
    </header>
  );
};

export default Header;