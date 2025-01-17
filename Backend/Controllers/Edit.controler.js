import Order from '../Models/Order.model.js';
import { logAuditEventAsync } from '../Middleware/AuditLog.js';
import Product from '../Models/Product.model.js';

//edit an order
export const editOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { items, status } = req.body;

        // Fetch the order to be updated
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found.' });
        }

        // Validate items and calculate new totalPrice if items are provided
        let totalPrice = order.totalPrice; // Default to existing totalPrice
        if (items) {
            totalPrice = 0;
            for (const item of items) {
                const product = await Product.findById(item.productId);
                if (!product) {
                    return res.status(404).json({
                        message: `Product with ID ${item.productId} not found.`,
                    });
                }

                totalPrice += item.quantity * item.price;
            }
            order.items = items; // Update items
        }

        // Update the order status if provided
        if (status) {
            const validStatuses = ['pending', 'approved', 'out for delivery'];
            if (!validStatuses.includes(status)) {
                return res.status(400).json({ message: 'Invalid status value.' });
            }
            order.status = status;
        }

        // Update the totalPrice and save changes
        order.totalPrice = totalPrice;
        const updatedOrder = await order.save();

        // Respond with the updated order
        res.status(200).json({
            message: 'Order updated successfully.',
            order: updatedOrder,
        });

        // Log the successful update
        logAuditEventAsync('Edit Order', order.customerId, {
            message: `Order with ID ${orderId} updated.`,
        });
    } catch (error) {
        console.error('Error updating order:', error);

        // Respond with error
        res.status(500).json({ message: 'Internal server error.' });

        // Log the error
        logAuditEventAsync('Edit Order Error', null, {
            message: error.message,
        });
    }
};