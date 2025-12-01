import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Contexto Global
import { ShopContext } from './context/ShopContext';

// Componentes Estructurales
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Contenedores (Páginas Lógicas)
import ItemListContainer from './components/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer';
import NovedadesPage from './pages/NovedadesPage';
import ProximamentePage from './pages/ProximamentePage';
import NotFoundPage from './pages/NotFoundPage';

// Modales Globales
import CartModal from './components/CartModal';
import LoginModal from './components/LoginModal';
import EditModal from './components/EditModal';
import CheckoutModal from './components/CheckoutModal';

/**
 * Componente Principal de la Aplicación
 * Define la estructura de rutas dinámicas requerida para la navegación.
 */
function App() {
  const { modales } = useContext(ShopContext);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <ToastContainer position="top-right" autoClose={3000} />

      <Header />
      
      <main style={{ minHeight: '60vh' }}>
        <Routes>
          {/* Ruta Home */}
          <Route path="/" element={<NovedadesPage />} />
          
          {/* Rutas de Catálogo y Categorías (ItemListContainer) */}
          <Route path="/catalogo" element={<ItemListContainer />} />
          <Route path="/categoria/:categoryId" element={<ItemListContainer />} />
          
          {/* Ruta de Detalle de Producto (ItemDetailContainer) */}
          <Route path="/item/:itemId" element={<ItemDetailContainer />} />
          
          {/* Rutas Estáticas */}
          <Route path="/proximamente" element={<ProximamentePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* Renderizado de Modales Globales */}
      {modales.carrito && <CartModal />}
      {modales.checkout && <CheckoutModal />}
      {modales.login && <LoginModal />}
      {modales.editar && <EditModal />}
    

      <Footer />
    </BrowserRouter>
  )
}

export default App;