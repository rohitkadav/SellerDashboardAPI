import express from 'express';
import { createReturn, getReturns } from '../controller/returnController.js';
import { verifyToken, roleCheck } from '../middlewares/authMiddleware.js';

const returnRouter = express.Router();

returnRouter.post('/', verifyToken, roleCheck('seller', 'admin'), createReturn);
returnRouter.get('/', verifyToken, roleCheck('admin', 'viewer', 'seller'), getReturns);

export default returnRouter;
