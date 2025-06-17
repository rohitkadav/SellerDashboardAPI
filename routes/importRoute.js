import express from 'express';
import upload from '../utils/upload.js';
import { importStockCSV } from '../controller/importController.js';
import { verifyToken, roleCheck } from '../middlewares/authMiddleware.js';

const importRouter = express.Router();

importRouter.post('/stock', verifyToken, roleCheck('admin'), upload.single('file'), importStockCSV);

export default importRouter;
