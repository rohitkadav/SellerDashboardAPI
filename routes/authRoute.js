import express from 'express';
import { register, login ,logout } from '../controller/authController.js';
import { verifyToken , roleCheck } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/admin-dashboard', verifyToken, roleCheck('admin'), (req, res) => {
  res.json({ message: 'Welcome Admin!' });
});
router.get('/seller-dashboard', verifyToken, roleCheck('seller'), (req, res) => {
  res.json({ message: `Hello ${req.user.role}` });
});


export default router;
