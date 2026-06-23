import { Router } from 'express';
import { 
  getProducts, 
  getCategories, 
  simulateInsert, 
  getStats,
  checkHealth 
} from '../controllers/product.controller.js';

const router = Router();

router.get('/health', checkHealth);
router.get('/products', getProducts);
router.get('/categories', getCategories);
router.post('/simulate', simulateInsert);
router.get('/stats', getStats);

export default router;
