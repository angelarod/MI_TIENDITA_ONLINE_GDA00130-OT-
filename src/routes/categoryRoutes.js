import { Router } from 'express';
import { createCategory, getCategories, getCategory, updateCategory } from '../controllers/category.controllers.js';

const router = Router();

router.get('/categorias', getCategories); // Obtener todas las categorías
router.get('/categorias/:id', getCategory); // Obtener una categoría por ID
router.post('/categorias', createCategory); // Crear una nueva categoría
router.put('/categorias/:id', updateCategory); // Actualizar una categoría

export default router;
