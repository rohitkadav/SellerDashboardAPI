import express from 'express';
import {
  getSummary,
  exportSalesCSV,
  exportCombinedJSON
} from '../controller/reportController.js';

import { verifyToken, roleCheck } from '../middlewares/authMiddleware.js';

const reportRouter = express.Router();

reportRouter.get('/summary', verifyToken, roleCheck('admin', 'viewer'), getSummary);
reportRouter.get('/export', verifyToken, roleCheck('admin'), exportSalesCSV);
reportRouter.get('/export-json', verifyToken, roleCheck('admin', 'viewer'), exportCombinedJSON);

export default reportRouter;
