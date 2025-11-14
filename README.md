# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

Resumen Completo del Proyecto Frontend

Descripción General
Aplicación web SPA (Single Page Application) de gestión de productos con React, Redux, Bootstrap y soporte multi-idioma.

Stack Tecnológico Completo

Core Framework & Build Tools
Tecnología	Versión	Propósito
React	18.3.1	Framework principal UI
Vite	Latest	Build tool & dev server rápido
JavaScript ES6+	-	Lenguaje de programación
Manejo de Estado
Tecnología	Versión	Propósito
Redux Toolkit	2.8.2	State management moderno
React Redux	9.2.0	Integración React-Redux
Reselect	Incluido	Selectores memoizados
Routing & Navegación
Tecnología	Versión	Propósito
React Router Dom	7.7.1	Navegación SPA
UI Framework & Estilos
Tecnología	Versión	Propósito
Bootstrap	5.x	CSS framework
React Bootstrap	2.10.10	Componentes Bootstrap para React
Bootstrap Icons	Latest	Iconografía
Formularios & Validación
Tecnología	Versión	Propósito
React Hook Form	7.61.1	Manejo de formularios
PropTypes	-	Validación de props
Notificaciones & UX
Tecnología	Versión	Propósito
React Toastify	11.0.5	Toast notifications
Internacionalización (i18n)
Tecnología	Versión	Propósito
react-i18next	Latest	Framework i18n
i18next	Latest	Core i18n
i18next-http-backend	Latest	Carga archivos traducción
i18next-browser-languagedetector	Latest	Detección automática idioma
Testing
Tecnología	Versión	Propósito
@testing-library/react	16.2.0	Testing components

Estructura del Proyecto
Funcionalidades Implementadas
CRUD Completo de Productos
✅ Create: Agregar nuevos productos
✅ Read: Listar todos los productos
✅ Update: Editar productos existentes
✅ Delete: Eliminar con confirmación
Características UX/UI
✅ Modal Bootstrap para formularios
✅ Loading spinners durante peticiones
✅ Toast notifications (éxito/error)
✅ Confirmación antes de eliminar
✅ Validación de formularios en tiempo real
✅ Diseño responsive (mobile-first)
✅ Accesibilidad ARIA completa
Internacionalización
✅ Soporte Inglés/Español
✅ Cambio dinámico de idioma
✅ Detección automática idioma navegador
✅ Persistencia de preferencia usuario
Optimizaciones
✅ React.memo para evitar re-renders
✅ useCallback para handlers memoizados
✅ Selectores Redux memoizados
✅ Code splitting automático (Vite)
✅ Hot Module Replacement (HMR)

Patrones de Diseño Utilizados
Container/Presentational Pattern

Separación lógica/presentación
Redux Toolkit Pattern (Flux)

Flujo unidireccional de datos
Custom Hooks Pattern

Reutilización de lógica
Memoization Pattern

Optimización de performance
Composition Pattern

Componentes reutilizables

