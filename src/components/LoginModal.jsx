import React, { useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';

/**
 * Componente Modal de Autenticación
 * Gestiona el formulario de ingreso para usuarios con privilegios administrativos.
 * Interactúa directamente con el estado global para validar credenciales.
 */
const LoginModal = () => {
  // Acceso al contexto global para funciones de auth y control de UI
  const { iniciarSesion, toggleModal } = useContext(ShopContext);

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Invocamos la función del contexto. Retorna true si es exitoso.
    const exito = iniciarSesion(user, pass);
    
    if (!exito) {
      setError("Usuario o contraseña incorrectos.");
    }
    };

  return (
    <div className="modal-overlay visible">
      <div className="modal-content">
        <h2>Acceso Administrador</h2>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="login-user">Usuario</label>
                <input 
                    type="text" 
                    id="login-user" 
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    autoFocus
                />
            </div>
            
            <div className="form-group">
                <label htmlFor="login-pass">Contraseña</label>
                <input 
                    type="password" 
                    id="login-pass"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                />
            </div>
            
            {error && <small className="error-mensaje">{error}</small>}
            
            <div className="modal-actions">
                <button type="submit" className="button">Ingresar</button>
                <button 
                    type="button" 
                    onClick={() => toggleModal('login', false)} 
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

export default LoginModal;