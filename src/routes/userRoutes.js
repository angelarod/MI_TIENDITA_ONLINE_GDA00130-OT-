import { Router } from 'express';
import { createUser, updateUser } from '../controllers/users.controllers.js';

const router = Router();

router.post('/usuarios', createUser); // Crear un nuevo usuario
router.put('/usuarios/:id', updateUser); // Actualizar un usuario

export default router;
