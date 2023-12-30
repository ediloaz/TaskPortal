# Proyecto Web Single Page - Task Portal 🚀

¡Explora, crea y gestiona tareas de manera intuitiva!

Click  ➡️ [ en Github Pages se ve el Frontend](https://ediloaz.github.io/TaskPortal/task-portal-frontend/build/)

## Advertencias Importantes ⚠️

Antes de sumergirte en este código, es crucial tener en cuenta algunas consideraciones:


### Frontend Avanzado, Backend en Desarrollo 🚧

Este repositorio se enfoca principalmente en el Frontend, con avances significativos en la parte visual. El tiempo limitado y días especiales permitió destacar elementos como el modal para Inicio de Sesión y Registro de usuario, columnas de tareas, y cards que se configuran directamente en el código del Frontend.

### Conexión Limitada al Backend en GitHub 🌐

Actualmente, el Backend está en desarrollo y no está alojado en este repositorio de GitHub. El Backend utiliza devservices para administrar una base de datos en Docker, y los cards que ves aquí se crean mediante hard-coding del lado del Frontend. La conexión al endpoint GET para obtener cards no está habilitada en este entorno de GitHub, sin embargo es la única que se programó del lado del servidor (se puede testear en un entorno local).

### Cambios en el Enfoque del Wizard 🔄

El enfoque inicial del "wizard guide" con 3 sliders ha evolucionado. Hemos adoptado un estilo de dashboard con un header para el manejo del usuario, ya que encontramos que se alinea mejor con nuestras metas y requisitos.

 <p> . </p><p> . </p>


## Características Destacadas 🌟

### Frontend - React 🔧
    Registro de Usuario:
        Formulario con validaciones y máscaras.
        Verificación de usuario único.
        Encriptación segura de contraseñas.

    Administrador de Tareas:
        Tres columnas para tareas: Pendientes, En Progreso, Terminadas.
        Creación y movimiento intuitivo de tareas.
        Asociación de imágenes con tareas en cualquier estado.

    Ventanas Adicionales:
        Ventana de Logueo con validación de usuario y contraseña.
        Ventana de Registro que muestra datos recopilados del usuario.

### Backend - Quarkus con Compilación Nativa 🔧

    MicroServicio en Quarkus:
        Compilación nativa para eficiencia.
        API Rest para registro, login, CRUD de tareas e imágenes.
        Almacenamiento seguro en base de datos PostgreSQL.
        Encriptación RSA_PKCS1_OAEP_PADDING para contraseñas.

¡Explora el código, contribuye y sé parte de la evolución de este proyecto único! ✨