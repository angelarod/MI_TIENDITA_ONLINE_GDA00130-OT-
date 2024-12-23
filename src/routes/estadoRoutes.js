import { Router } from 'express';
import { createEstado, getEstados, getEstado, updateEstado } from '../controllers/states.controllers.js';

const router = Router();

router.get('/estados', getEstados); // Obtener todos los estados
router.get('/estados/:id', getEstado); // Obtener un estado por ID
router.post('/estados', createEstado); // Crear un nuevo estado
router.put('/estados/:id', updateEstado); // Actualizar un estado

export default router;
