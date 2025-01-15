import express from 'express';
import { addCustomer, addProduct } from '../Controllers/Add.Controler.js';

const router = express.Router();

// routes
router.post('/add-customer', addCustomer);
router.post('/add-product', addProduct);

export default router;