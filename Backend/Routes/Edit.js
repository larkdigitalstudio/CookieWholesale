import express from 'express';

const router = express.Router();

// routes
//edit order
router.put('/edit-order/:orderId', editOrder);

export default router;