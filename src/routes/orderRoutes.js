import { Router } from 'express';
import { createOrder, getOrders, getOrder, updateOrder } from '../controllers/orders.controllers.js';

const router = Router();

router.get('/ordenes', getOrders); // Obtener todas las órdenes
router.get('/ordenes/:id', getOrder); // Obtener una orden por ID
router.post('/ordenes', createOrder); // Crear una nueva orden
router.put('/ordenes/:id', updateOrder); // Actualizar una orden

export default router;
