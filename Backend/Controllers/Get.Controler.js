import Order from '../Models/Order.Model.js'; 

export const getLatestOrders = async (req, res) => {
    try {
        // Extract the limit from query parameters, default to 10 if not provided
        const { limit = 10 } = req.query;

        // Fetch the latest orders, sorted by creation date
        const orders = await Order.find()
            .sort({ createdAt: -1 }) // Sort by newest first
            .limit(parseInt(limit, 10)); // Limit the number of results

        // Respond with the fetched orders
        res.status(200).json({
            message: `Fetched the latest ${orders.length} orders.`,
            orders,
        });

        // Log the event
        logAuditEventAsync(
            'Get Latest Orders',
            null,
            { message: `${orders.length} latest orders fetched.` }
        );
    } catch (error) {
        console.error('Error fetching latest orders:', error);

        // Respond with error
        res.status(500).json({ message: 'Internal server error.' });

        // Log the error
        logAuditEventAsync(
            'Get Latest Orders Error',
            null,
            { message: error.message }
        );
    }
};
