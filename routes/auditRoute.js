import express from 'express';
import { getAuditLogs } from '../controller/auditController.js';
import { verifyToken, roleCheck } from '../middlewares/authMiddleware.js';

const auditRouter = express.Router();

auditRouter.get('/', verifyToken, roleCheck('admin'), getAuditLogs);

export default auditRouter;
