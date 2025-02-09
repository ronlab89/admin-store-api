# 📊 Dashboard Administrativo - REST API

## 🚀 Descripción

Esta es una API RESTful desarrollada con **Node.js**, **Express** y **MongoDB** para gestionar un **Dashboard Administrativo** destinado a pequeños negocios. Permite administrar productos, clientes, inventario, compras y ventas, empleados, sesion de usuario con tokens JWT, notificaciones, reportes y configuración.

---

## 📌 Características Principales

✅ **Gestión de Productos**: Creación, actualización y eliminación de productos con control de stock.  
✅ **Control de Inventarios**: Registro de entradas y salidas de productos.  
✅ **Compras y Ventas**: Manejo de transacciones comerciales con historial detallado.  
✅ **Autenticación de Usuarios**: Sesión segura con JWT.  
✅ **Reportes**: Generación de informes financieros y de inventario.  
✅ **Notificaciones**: Alertas sobre eventos importantes.  
✅ **Personalización**: Configuración flexible para adaptar la app a las necesidades del negocio.

---

## 🛠 Tecnologías Utilizadas

- **Node.js** - Entorno de ejecución para JavaScript en el servidor.
- **Express.js** - Framework minimalista para crear API REST.
- **MongoDB + Mongoose** - Base de datos NoSQL y modelado de datos.
- **JWT (JSON Web Token)** - Autenticación segura.
- **Cors** - Permitir solicitudes desde diferentes dominios.
- **Dotenv** - Manejo de variables de entorno.

---

## 📦 Instalación y Configuración

1. **Clona este repositorio:**

   ```bash
   git clone https://github.com/tu-usuario/dashboard-api.git
   cd dashboard-api
   ```

2. **Instala las dependencias:**

```bash
npm install
```

3. **Configura las variables de entorno:**
   Crea un archivo .env en la raíz del proyecto y agrega las siguientes variables:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/dashboardDB
JWT_SECRET=tu_secreto_jwt
JWT_REFRESH=tu_secreto_refresh
NODE_ENV=development
ORIGIN=url_producción
ORIGIN1=url_desarrollo
```

4. **Inicia el servidor en modo desarrollo:**

```bash
npm run dev
```

5. **Accede a la API:**
   La API estará disponible en http://localhost:5000.

---

## 📡 Endpoints Principales

Para ver todos los endpoints, consulta la documentación completa en Postman.

## 🛡 Seguridad

Autenticación con JWT: Protección de rutas sensibles.
Roles y permisos: Diferenciación de accesos entre usuarios.
Validaciones de datos: Evitar inconsistencias en la base de datos.

## 🎯 Roadmap & Mejoras Futuras

- Integración con servicios de pago.
- Generación automática de reportes en PDF.
- Integración con proveedores externos para facturación electrónica.

## 🤝 Contribuciones

¡Toda contribución es bienvenida!

**Para colaborar:**
Realiza un fork del repositorio.
Crea una rama (feature/nueva-funcionalidad).
Envía un pull request con tus mejoras.

## 📝 Licencia

Este proyecto está bajo la licencia MIT. Puedes usarlo, modificarlo y distribuirlo libremente.
