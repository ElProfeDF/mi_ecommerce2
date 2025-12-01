import React, { useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';

/**
 * Componente Modal de Checkout (Pago)
 * Simula el proceso de pago final, validando inputs y mostrando feedback visual.
 */
const CheckoutModal = () => {
  const { toggleModal, procesarPago, totalPrecio } = useContext(ShopContext);

  const [datosTarjeta, setDatosTarjeta] = useState({
    nombre: '',
    numero: '',
    expiracion: '',
    cvv: ''
  });

  const [procesando, setProcesando] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatosTarjeta({ ...datosTarjeta, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProcesando(true);

    // Simulación de latencia de red para procesamiento de pago
    setTimeout(() => {
      setProcesando(false);
      procesarPago(); // Ejecuta la lógica de éxito del contexto
    }, 2500);
  };

  return (
    <div className="modal-overlay visible">
      <div className="modal-content">
        <h2>Finalizar Compra</h2>
        
        <div className="card-preview">
            <div className="card-number-display">
                {datosTarjeta.numero || "#### #### #### ####"}
            </div>
            <div className="card-details-display">
                <span>{datosTarjeta.nombre || "NOMBRE TITULAR"}</span>
                <span>{datosTarjeta.expiracion || "MM/AA"}</span>
            </div>
        </div>

        {procesando ? (
            <div style={{ textAlign: 'center', padding: '20px' }}>
                <div className="spinner"></div>
                <p>Procesando pago seguro...</p>
            </div>
        ) : (
            <form onSubmit={handleSubmit} className="checkout-form">
                <div className="form-group">
                    <label>Nombre del Titular</label>
                    <input 
                        type="text" 
                        name="nombre" 
                        placeholder="Como figura en la tarjeta" 
                        required 
                        value={datosTarjeta.nombre}
                        onChange={handleChange}
                    />
                </div>
                
                <div className="form-group">
                    <label>Número de Tarjeta</label>
                    <input 
                        type="text" 
                        name="numero" 
                        placeholder="0000 0000 0000 0000" 
                        required 
                        maxLength="19"
                        value={datosTarjeta.numero}
                        onChange={handleChange}
                    />
                </div>

                <div className="checkout-row">
                    <div className="form-group">
                        <label>Vencimiento</label>
                        <input 
                            type="text" 
                            name="expiracion" 
                            placeholder="MM/AA" 
                            required 
                            maxLength="5"
                            value={datosTarjeta.expiracion}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>CVV</label>
                        <input 
                            type="password" 
                            name="cvv" 
                            placeholder="123" 
                            required 
                            maxLength="3"
                            value={datosTarjeta.cvv}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="modal-actions" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontWeight: 'bold' }}>
                        Total a pagar: ${totalPrecio.toLocaleString('es-AR')}
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button 
                            type="button" 
                            onClick={() => toggleModal('checkout', false)} 
                            className="button button-alt"
                        >
                            Cancelar
                        </button>
                        <button type="submit" className="button button-success">Pagar Ahora</button>
                    </div>
                </div>
            </form>
        )}
      </div>
    </div>
  );
};

export default CheckoutModal;