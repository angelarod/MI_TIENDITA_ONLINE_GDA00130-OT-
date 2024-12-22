import { Router } from 'express';
import { createProduct, getProducts, getProduct, updateProduct, deleteProduct } from '../controllers/productControllers.js';

const router = Router();

router.get('/productos', getProducts); // Obtener todos los productos activos
router.get('/productos/:id', getProduct); // Obtener un producto por ID
router.post('/productos', createProduct); // Crear un nuevo producto
router.put('/productos/:id', updateProduct); // Actualizar un producto
router.delete('/productos/:id', deleteProduct); // Inactivar un producto

export default router;
