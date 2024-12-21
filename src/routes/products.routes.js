import { Router } from 'express'
import { actProduct, createProduct, deleteProduct, getProduct, getProducts } from '../controllers/products.controllers.js';

const router = Router();

router.get('/productos', getProducts);

router.get('/productos/:id', getProduct);

router.post('/productos', createProduct);

router.put('/productos/:id', actProduct);

router.delete('/productos/:id', deleteProduct);

export default router;