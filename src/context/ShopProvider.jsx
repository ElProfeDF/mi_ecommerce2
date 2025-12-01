import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { ShopContext } from './ShopContext';

/**
 * Componente Proveedor de Estado Global (ShopProvider)
 * * Este componente encapsula la lógica de negocio, el manejo de estado y 
 * la comunicación con APIs externas. Provee estos datos y funciones a 
 * todo el árbol de componentes de la aplicación mediante Context API.
 */
export const ShopProvider = ({ children }) => {
  
  // --- DEFINICIÓN DE ESTADOS GLOBALES ---

  // Almacena el catálogo de cursos obtenido desde el origen de datos
  const [cursos, setCursos] = useState([]);

  // Gestiona el estado del carrito con inicialización diferida desde LocalStorage
  // para asegurar la persistencia de datos entre recargas.
  const [carrito, setCarrito] = useState(() => {
    const carritoGuardado = localStorage.getItem("carritoCompras");
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
  });

  // Almacena la cotización actual del dólar obtenida de la API externa
  const [valorDolar, setValorDolar] = useState(null);
  
  // Estado de autenticación del usuario (Simulación de rol de Administrador)
  const [esAdmin, setEsAdmin] = useState(false);

  // Control centralizado de la visibilidad de los diferentes modales de la UI
  const [modales, setModales] = useState({
    carrito: false,
    login: false,
    checkout: false,
    editar: null,   // Almacena el objeto curso a editar o null si está cerrado
    detalles: null  // Almacena el objeto curso a visualizar o null si está cerrado
  });

  // Bandera para el manejo de errores en la carga inicial de datos
  const [errorCarga, setErrorCarga] = useState(false);


  // --- EFECTOS DE CICLO DE VIDA ---

  /**
   * Efecto de inicialización:
   * 1. Realiza la petición asíncrona para obtener el catálogo de cursos.
   * 2. Realiza la petición asíncrona para obtener la cotización de divisas.
   * Maneja errores de red y notifica al usuario en caso de fallo crítico.
   */
  useEffect(() => {
    fetch('/cursos.json')
      .then((res) => {
        if (!res.ok) throw new Error("Error HTTP al obtener cursos");
        return res.json();
      })
      .then((data) => {
        setCursos(data);
        setErrorCarga(false);
      })
      .catch((err) => {
        console.error("Error crítico en la carga de datos:", err);
        setErrorCarga(true);
        toast.error("Error al cargar el catálogo de cursos.");
      });

    fetch('https://dolarapi.com/v1/dolares/blue')
        .then(res => res.json())
        .then(data => setValorDolar(data.venta))
        .catch(err => console.error("Error en servicio de cotización:", err));
  }, []);

  /**
   * Efecto de persistencia:
   * Sincroniza el estado del carrito con el LocalStorage del navegador
   * cada vez que se detectan cambios en la lista de items.
   */
  useEffect(() => {
    localStorage.setItem("carritoCompras", JSON.stringify(carrito));
  }, [carrito]);


  // --- LÓGICA DE NEGOCIO (ACCIONES) ---

  /**
   * Agrega un curso al carrito o incrementa su cantidad si ya existe.
   * @param {Object} curso - El objeto curso a agregar.
   */
  const agregarAlCarrito = (curso) => {
    const existe = carrito.find(item => item.id === curso.id);
    if (existe) {
      const nuevoCarrito = carrito.map(item => 
        item.id === curso.id ? { ...item, cantidad: item.cantidad + 1 } : item
      );
      setCarrito(nuevoCarrito);
      toast.info(`Cantidad actualizada: ${curso.nombre}`);
    } else {
      setCarrito([...carrito, { ...curso, cantidad: 1 }]);
      toast.success(`¡${curso.nombre} agregado!`);
    }
  };

  /**
   * Elimina un ítem específico del carrito basado en su ID.
   * @param {string} id - Identificador del curso a eliminar.
   */
  const eliminarDelCarrito = (id) => {
    setCarrito(carrito.filter(item => item.id !== id));
    toast.warn("Item eliminado del carrito.");
  };

  /**
   * Restablece el carrito a su estado inicial (vacío).
   */
  const vaciarCarrito = () => {
    setCarrito([]);
    toast.info("Se ha vaciado el carrito de compras.");
  };

  /**
   * Finaliza el flujo de compra, limpia el carrito y cierra el modal de checkout.
   */
  const procesarPago = () => {
    setModales({ ...modales, checkout: false });
    setCarrito([]);
    toast.success("¡Pago exitoso! Acceso enviado al mail.", { autoClose: 5000 });
  };

  /**
   * Valida las credenciales del usuario para otorgar acceso de administrador.
   * @param {string} user - Nombre de usuario.
   * @param {string} pass - Contraseña.
   * @returns {boolean} - True si la autenticación es exitosa.
   */
  const iniciarSesion = (user, pass) => {
    if (user === "admin" && pass === "1234") {
      setEsAdmin(true);
      setModales({ ...modales, login: false });
      toast.success("Bienvenido Administrador");
      return true;
    }
    return false;
  };

  /**
   * Cierra la sesión del usuario y limpia estados sensibles de edición.
   */
  const cerrarSesion = () => {
    setEsAdmin(false);
    setModales({ ...modales, editar: null });
    toast.info("Sesión cerrada.");
  };

  /**
   * Elimina un curso del catálogo general (Acción de Administrador).
   * @param {string} id - Identificador del curso a eliminar.
   */
  const eliminarCurso = (id) => {
    if (window.confirm("¿Confirmar eliminación del curso?")) {
      setCursos(cursos.filter(c => c.id !== id));
      toast.error("El curso ha sido eliminado.");
    }
  };

  /**
   * Actualiza la información de un curso existente.
   * @param {Object} cursoEditado - Objeto con los datos actualizados.
   */
  const guardarCursoEditado = (cursoEditado) => {
    setCursos(cursos.map(c => c.id === cursoEditado.id ? cursoEditado : c));
    setModales({ ...modales, editar: null });
    toast.success("Curso actualizado correctamente.");
  };

  /**
   * Función utilitaria para controlar la apertura y cierre de modales.
   * @param {string} modalName - Clave del modal en el estado (ej: 'login', 'carrito').
   * @param {any} value - Valor a asignar (booleano para visibilidad u objeto para datos).
   */
  const toggleModal = (modalName, value = true) => {
    setModales(prev => ({ ...prev, [modalName]: value }));
  };

  // --- DATOS DERIVADOS ---
  
  // Cálculo de totales para resumen de compra y badges de UI
  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  const totalPrecio = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

  return (
    <ShopContext.Provider value={{
      // Estados
      cursos,
      carrito,
      valorDolar,
      esAdmin,
      modales,
      errorCarga,
      totalItems,
      totalPrecio,
      
      // Acciones
      agregarAlCarrito,
      eliminarDelCarrito,
      vaciarCarrito,
      procesarPago,
      iniciarSesion,
      cerrarSesion,
      eliminarCurso,
      guardarCursoEditado,
      toggleModal
    }}>
      {children}
    </ShopContext.Provider>
  );
};