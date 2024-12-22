import { Router } from 'express';
import { createClient, getClients, getClient, updateClient } from '../controllers/clientControllers.js';

const router = Router();

router.get('/clientes', getClients); // Obtener todos los clientes
router.get('/clientes/:id', getClient); // Obtener un cliente por ID
router.post('/clientes', createClient); // Crear un nuevo cliente
router.put('/clientes/:id', updateClient); // Actualizar un cliente

export default router;
