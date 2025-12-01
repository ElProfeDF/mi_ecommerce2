import { createContext } from 'react';

/**
 * Contexto Global de la Aplicación.
 * Actúa como contenedor de estado para compartir datos, funciones de negocio
 * y estados de interfaz entre componentes sin necesidad de prop-drilling.
 */
export const ShopContext = createContext();