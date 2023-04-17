// Manejo de rutas para los ednpoints de usuarios, para esto usa las funciones del controlador de usuarios
// Permiten la adicion, baja y modificacion de usuarios.

const express = require('express');
const userController = require('../controllers/user.controller')

const userRouter = express.Router();

// Obtencion de usuario por id, parametro pid
userRouter.get('/:uid', userController.getUser);
// Obtencion de todos los usuarios 
userRouter.get('/', userController.getUsers);
// Adicion de usuario
userRouter.post('/', userController.addUser);
// Actualizacion de usuario
userRouter.put('/:uid', userController.updateUser);
// Baja de usuario
userRouter.delete('/:uid', userController.deleteUser);

module.exports = userRouter;