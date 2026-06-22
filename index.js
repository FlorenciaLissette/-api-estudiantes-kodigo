//Mencionando el modulo de express para nuestro proyecto
const express = require('express')

//creando nuestro objeto central (global) que se utiliza en nuestro proyecto (rutas, funciones, configuraciones)
const app = express()


//indicamos que nuestra api tiene un middleware (procesar datos en formato JSON)
app.use(express.json())

// simulando una base de datos de estudiantes
const estudiantes =[
    {id: 1, nombre: "Ana Garcia", edad: 18, correo:"ana.garcia@email.com"},

    {id: 2, nombre: "Calos López", edad: 17, correo:"carlos.lopez@email.com" },

    {id: 3, nombre: "María Pérez", edad: 17, correo:"maria.p@email.com" },
    
]

//por defecto el servidor de express es el 3000
//servidor //localhost
app.listen(3000,() =>{ console.log("Hola, estas utilizando express")})

//comando para ejecutar el servidor (Archivo) -> node index.js

//creando enrutamiento para nuestra API

//creando la ruta principal (peticion HTTP: GET, POST, PUT, DELETE, PATCH)
/**
 * (primer parametro) req = request (se utiliza cuando necesritamos por ejemplo datos del usuario (body), headers, parametros)
 * (segundo parametro) res = responde (lo que se devuelve al cliente)
 */

//Mi primer enpoint
app.get('/',(req, res) => {
//codigo de la funcion 
res.send("Hola Mundo, Bienvenidos a mi API Estudiantes")
})
//ruta para obtener todos los estudiantes (segundo endpoint)
app.get('/estudiantes', (req, res) => {
    // codigo
    res.status(200).json(estudiantes) 
});

// ruta para buscar un estudiante por ID (la ruta lleva parametro (:))
app.get('/estudiantes/:estudianteId', (req, res) => {
    //capturando el valor del parametro
    const id = Number(req.params.estudianteId); 
    //devolvemos el estudiante con el metodo find
    const encontrar_estudiante = estudiantes.find(estudiante => estudiante.id === id);

    //validando si el estudiante NO existe
    if(!encontrar_estudiante){
        return res.status(404).json({ error: 'Estudiante no encontrado' })
    }

    res.status(200).json(encontrar_estudiante)
    });


    // ruta para crear un nuevo estudiante
app.post('/estudiantes', (req, res) => {
    // haciendo el cuerpo de datos para registrar el estudiante
    const { nombre, edad, correo } = req.body

    // agregamos los datos ingresados a un objeto
    const nuevoEstudiante = {
        id: estudiantes.length + 1,
        //nombre: nombre
        nombre,
        edad,
        correo,
    }

      //agregamos el nuevo objeto al arreglo
    estudiantes.push(nuevoEstudiante);

    res.status(201).json({
        message: 'Registrado exitosamente',
        estudiante: nuevoEstudiante
    })

});

// ruta para actualizar un estudiante (correo)
app.patch('/estudiantes/:estudianteId', (req, res) => {
    // primero encontramos al estudiante a actualizar
    const id = Number(req.params.estudianteId); 
    const encontrar_estudiante = estudiantes.find(estudiante => estudiante.id === id);

    //validando si el estudiante NO existe
    if(!encontrar_estudiante){
        return res.status(404).json({ error: 'Estudiante no encontrado' })
    }

    // segundo si el estudiante existe, actualizamos su correo
    const { nuevo_correo } = req.body
    encontrar_estudiante.correo = nuevo_correo

    res.status(200).json({
        message: 'Correo actualizado exitosamente',
        estudiante: encontrar_estudiante
    })
});


app.put('/estudiantes/:estudianteId', (req, res) => {
    const id = Number(req.params.estudianteId);
    
    // 🛠️ CORRECCIÓN: Cambiado .find() por .findIndex() para poder usar la variable 'indice'
    const indice = estudiantes.findIndex(estudiante => estudiante.id === id);

    // 🛠️ CORRECCIÓN: Añadida la condición correcta para validar si no existe (-1)
    if (indice === -1) {
        return res.status(404).json({ error: 'Estudiante no encontrado' })
    }

    // Tomamos los nuevos datos del body
    const { nombre, edad, correo } = req.body;

    // Reemplazamos el objeto completo manteniendo el mismo ID original
    estudiantes[indice] = {
        id,
        nombre,
        edad,
        correo
    };

    res.status(200).json({
        message: 'Estudiante reemplazado por completo con éxito',
        estudiante: estudiantes[indice]
    });
})


// Implementar DELETE (Eliminar estudiante)
app.delete('/estudiantes/:estudianteId', (req, res) => {
    const id = Number(req.params.estudianteId);
    const indice = estudiantes.findIndex(estudiante => estudiante.id === id);

    if (indice === -1) {
        return res.status(404).json({ error: 'Estudiante no encontrado' });
    }

    // Eliminamos el estudiante del array
    const eliminado = estudiantes.splice(indice, 1);

    res.status(200).json({
        message: "Estudiante eliminado exitosamente",
        estudiante: eliminado[0]
    });
});

               