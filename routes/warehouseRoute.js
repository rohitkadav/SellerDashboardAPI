import express from 'express';
import { transferStock } from '../controller/warehouseController.js';
import { verifyToken, roleCheck } from '../middlewares/authMiddleware.js';

const warehouseRouter = express.Router();
warehouseRouter.post('/transfer', verifyToken, roleCheck('admin', 'seller'), transferStock);

export default warehouseRouter;
