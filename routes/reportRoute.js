import express from 'express';
import {
  getSummary,
  exportSalesCSV,
  exportCombinedJSON,
  getSellerMetrics,
  exportStockCSV,
  exportSalesCSV2
} from '../controller/reportController.js';

import { verifyToken, roleCheck } from '../middlewares/authMiddleware.js';

const reportRouter = express.Router();

reportRouter.get('/summary', verifyToken, roleCheck('admin', 'viewer'), getSummary);
reportRouter.get('/export', verifyToken, roleCheck('admin'), exportSalesCSV);
reportRouter.get('/export-json', verifyToken, roleCheck('admin', 'viewer'), exportCombinedJSON);
reportRouter.get('/metrics', verifyToken, roleCheck('admin', 'seller'), getSellerMetrics);
reportRouter.get('/export/sales', verifyToken, roleCheck('admin'), exportSalesCSV2);
reportRouter.get('/export/stock', verifyToken, roleCheck('admin'), exportStockCSV);

export default reportRouter;
