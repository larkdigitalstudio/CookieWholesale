import express from 'express';
import { getLatestOrders, getUserOrders, getAllCustomers } from '../Controllers/Get.Controler';

const router = express.Router();

// routes
// Gets all orders for owners
router.get('/getAllOrders', getLatestOrders);
// Gets all orders for a specific user
router.get('/getUserOrders/:userId', getUserOrders);
// Gets all customers for owners
router.get('/getAllCustomers', getAllCustomers);


export default router;