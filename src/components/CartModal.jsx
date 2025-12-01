import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';

const CartModal = () => {
  // Consumo directo del Contexto
  const { 
    carrito, 
    eliminarDelCarrito, 
    vaciarCarrito, 
    valorDolar, 
    toggleModal 
  } = useContext(ShopContext);
  
  const total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

  const totalUSD = valorDolar 
    ? (total / valorDolar).toFixed(2) 
    : null;

  return (
    <div className="modal-overlay visible">
      <div className="modal-content">
        <button className="modal-close-btn" onClick={() => toggleModal('carrito', false)}>&times;</button>
        
        <h2>Mi Carrito de Compras</h2>
        
        <div id="carrito-items-container">
          {carrito.length === 0 ? (
            <p className="carrito-vacio">Tu carrito está vacío.</p>
          ) : (
            carrito.map((item) => (
              <div key={item.id} className="carrito-item">
                <div className="carrito-item-info">
                  <h4>{item.nombre}</h4>
                  <p>Cantidad: {item.cantidad}</p>
                </div>
                <span className="carrito-item-precio">
                    ${(item.precio * item.cantidad).toLocaleString('es-AR')}
                </span>
                <button 
                    className="carrito-item-eliminar" 
                    onClick={() => eliminarDelCarrito(item.id)}
                >
                    &times;
                </button>
              </div>
            ))
          )}
        </div>

        {carrito.length > 0 && (
          <div id="carrito-footer">
            <div className="carrito-total">
                <strong>Total (ARS):</strong> <span>${total.toLocaleString('es-AR')}</span>
            </div>
            
            <div className="carrito-total-usd">
                <strong>Total (USD Blue): </strong> 
                <span>
                    {totalUSD ? `U$S ${totalUSD}` : "Consultando cotización..."}
                </span>
            </div>

            <div className="modal-actions">
                <button onClick={vaciarCarrito} className="button button-danger">Vaciar Carrito</button>
                <button 
                    className="button"
                    onClick={() => {
                        toggleModal('carrito', false); // Cierra carrito
                        toggleModal('checkout', true); // Abre checkout
                    }}
                >
                    Finalizar Compra
                </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;