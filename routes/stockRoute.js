import express from 'express';
import {
  addStock,
  getStock,
  getLowStock,
  updateStock,
  bulkUpdateStock
} from '../controller/stockController.js';

import { verifyToken, roleCheck } from '../middlewares/authMiddleware.js';

const stockRouter = express.Router();

stockRouter.post('/bulk-update', verifyToken, roleCheck('seller', 'admin'), bulkUpdateStock);
stockRouter.get('/low-stock', verifyToken, roleCheck('seller', 'admin'), getLowStock);
stockRouter.post('/', verifyToken, roleCheck('seller', 'admin'), addStock);
stockRouter.get('/', verifyToken, roleCheck('seller', 'admin', 'viewer'), getStock);
stockRouter.put('/:id', verifyToken, roleCheck('seller', 'admin'), updateStock);



export default stockRouter;
