## Características
- Servidor local rápido configurado en el puerto 3000.
- Incorpora `express.json()` para manejar datos en formato JSON.
- Operaciones básicas (Lectura, Creación y Actualización parcial).

## Instalación y Configuración

1. Abre una terminal dentro de la carpeta raíz del proyecto.
2. Instala Express ejecutando:
   ```bash
   npm install
3. Ejecuta el servidor:
node index.js
Si todo está bien, verás en la consola el mensaje: "Hola, estás utilizando Express".

## Menú de Endpoints

Método Ruta. Propósito, Código y HTTP

GET
/
Bienvenida
200 OK

GET
/estudiantes
Listar todos los estudiantes
200 OK

GET
/estudiantes/:id
Buscar un estudiante por ID
200 OK / 404

POST
/estudiantes
Crear un nuevo estudiante
201 Created

PATCH
/estudiantes/:id
Modificar un dato rápido del estudiante
200 OK / 404

PUT
/estudiantes/:id
Reemplazar todos los datos del estudiante
200 OK / 404

DELETE
/estudiantes/:id
Eliminar un estudiante
200 OK / 4

Requisitos Previos
Node.js y npm deben estar instalados en tu sistema.
PruebasUtiliza Thunder Client para probar cada uno de los Endpoints en tiempo real.



