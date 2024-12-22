import { Router } from 'express';
import { createUser, getUsers, getUser, updateUser } from '../controllers/userControllers.js';

const router = Router();

router.get('/usuarios', getUsers); // Obtener todos los usuarios
router.get('/usuarios/:id', getUser); // Obtener un usuario por ID
router.post('/usuarios', createUser); // Crear un nuevo usuario
router.put('/usuarios/:id', updateUser); // Actualizar un usuario

export default router;
