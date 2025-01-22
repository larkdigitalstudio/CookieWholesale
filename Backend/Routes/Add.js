import express from 'express';
import { addCustomer, addProduct, addOrder, sendBulkEmail } from '../Controllers/Add.Controler.js';

const router = express.Router();

// routes
// Add a new customer
router.post('/add-customer', addCustomer);
// Add a new product
router.post('/add-product', addProduct);
//add a new order
router.post('/add-order', addOrder);
// send bulk emails to all customers
router.post('/send-bulk-emails', sendBulkEmail);

export default router;