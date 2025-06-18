import express from 'express';
import { getRestockRecommendations } from '../controller/predictController.js';
import { verifyToken, roleCheck } from '../middlewares/authMiddleware.js';

const predictRouter = express.Router();

predictRouter.get('/restock', verifyToken, roleCheck('admin', 'seller'), getRestockRecommendations);

export default predictRouter;
