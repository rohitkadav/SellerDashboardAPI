import express from 'express';
import {
  createSale,
  getSales,
  updateSale,
  deleteSale,
  getSalesSummary
} from '../controller/saleController.js';

import { verifyToken, roleCheck } from '../middlewares/authMiddleware.js';

const saleRouter = express.Router();

// Sellers can create/update/delete, viewers/admins can read
saleRouter.post('/', verifyToken, roleCheck('seller', 'admin'), createSale);
saleRouter.get('/', verifyToken, roleCheck('viewer', 'seller', 'admin'), getSales);
saleRouter.get('/summary', verifyToken, roleCheck('viewer', 'admin'), getSalesSummary);
saleRouter.put('/:id', verifyToken, roleCheck('seller', 'admin'), updateSale);
saleRouter.delete('/:id', verifyToken, roleCheck('seller', 'admin'), deleteSale);

export default saleRouter;
