# Proyecto Web Single Page - Task Portal 🚀

¡Explora, crea y gestiona tareas de manera intuitiva!

Click  ➡️ [ en Github Pages se ve el Frontend](https://ediloaz.github.io/TaskPortal/task-portal-frontend/build/)

## Advertencias Importantes ⚠️

Antes de sumergirte en este código, es crucial tener en cuenta algunas consideraciones:

### Frontend funcionando en Github Pages 🌐
Tenemos la interfaz en línea con una versión que creamos llamada 'OfflineMode' para cuando no podemos conectarnos al Backend, cuando se entre al aplicativo se debe presionar el botón de "Aceptar". El Backend no está alojado en el servidor de GitHub Pages o en algún otro, por lo que <b>su uso se debe hacer localmente montando los dos proyectos</b>. El Backend utiliza devservices para administrar una base de datos en Docker. 

### Cambios en el Enfoque del Wizard 🔄
El enfoque inicial del "wizard guide" con 3 sliders ha evolucionado. Hemos adoptado un estilo de dashboard con un header para el manejo del usuario, ya que encontramos que se alinea mejor con nuestras metas y requisitos.

 <p> . </p><p> . </p>


## Características Destacadas 🌟

### Frontend - React 🔧
    Registro e Ingreso de Usuario:
        Formulario.
        Verificación de usuario único.
        Encriptación segura de contraseñas.

    Administrador de Tareas:
        Tres columnas para tareas: Pendientes, En Progreso, Terminadas.
        Creación y movimiento intuitivo de tareas con Drag and Drop.
        Asociación de imágenes con tareas en cualquier estado.

    Ventanas (modales) Adicionales:
        Ventana de Logueo para ingresar.
        Ventana de Registro para registrar.
        Ventana de Agregar nueva tarea.
        Ventana de Información de la Cuenta que muestra datos recopilados del usuario.

### Backend - Quarkus con Compilación Nativa 🔧

    MicroServicio en Quarkus:
        Compilación nativa para eficiencia.
        API Rest para registro, login, CRUD de tareas e imágenes.
        Almacenamiento seguro en base de datos PostgreSQL usando devservices.
        Encriptación para contraseñas.

¡Explora el código, contribuye y sé parte de la evolución de este proyecto único! ✨