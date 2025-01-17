import Order from '../Models/Order.Model.js'; 
import User from '../Models/User.Model.js';
import { logAuditEventAsync } from '../Middleware/AuditLog.js';


// gets all orders from the database based on input from the owner
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


// gets a customers orders based on customerID
export const getUserOrders = async (req, res) => {
    try {
        // Extract the userId from route parameters
        const { userId } = req.params;

        // Validate the user ID
        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({ message: 'User not found.' });
            logAuditEventAsync('Get User Orders Error', userId, {
                message: 'User not found.',
            });
            return;
        }

        // Fetch all orders for the user, sorted by creation date (newest first)
        const orders = await Order.find({ userId }).sort({ createdAt: -1 });

        // Respond with the user's orders
        res.status(200).json({
            message: `Fetched ${orders.length} orders for the user.`,
            orders,
        });

        // Log the successful event
        logAuditEventAsync('Get User Orders', userId, {
            message: `${orders.length} orders fetched for the user.`,
        });
    } catch (error) {
        console.error('Error fetching user orders:', error);

        // Respond with an error message
        res.status(500).json({ message: 'Internal server error.' });

        // Log the error event
        logAuditEventAsync('Get User Orders Error', null, {
            message: error.message,
        });
    }
};

// get list of all users to be used by owners
export const getAllCustomers = async (req, res) => {
    try {
        // Fetch all users with the role of 'customer'
        const customers = await User.find({ role: 'customer' }).sort({ createdAt: -1 });

        // Respond with the list of customers
        res.status(200).json({
            message: `Fetched ${customers.length} customers.`,
            customers,
        });

        // Log the successful event
        logAuditEventAsync('Get All Customers', null, {
            message: `${customers.length} customers retrieved by owner.`,
        });
    } catch (error) {
        console.error('Error fetching customers:', error);

        // Respond with an error message
        res.status(500).json({ message: 'Internal server error.' });

        // Log the error event
        logAuditEventAsync('Get All Customers Error', null, {
            message: error.message,
        });
    }
};