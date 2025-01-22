import bcrypt from 'bcryptjs';
import User from '../Models/User.Model.js';
import Product from '../Models/Product.Model.js';
import logAuditEventAsync from '../Middleware/AuditLog.js';
import Order from '../Models/Order.Model.js';
import { transporter } from '../Utils/emailTransporter.js';

// add a customer /  customer registration
export const addCustomer = async (req, res) => {
    try {
        const {
            email,
            password,
            companyName,
            companyType,
            phoneNumber,
            ABN,
            notes,
            deliveryAddresses,
            companyContacts
        } = req.body;

        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user instance
        const newUser = new User({
            email,
            password: hashedPassword,
            companyName,
            companyType,
            phoneNumber,
            role: 'customer',
            ABN,
            notes,
            deliveryAddresses,
            companyContacts
        });

        // Save the user to the database
        await newUser.save();

        res.status(201).json({ message: 'Customer added successfully.', userId: newUser._id });

        // Log the event
        logAuditEventAsync(
            'New User Added',
            newUser._id,
            { companyName: newUser.companyName, message: " Just Registered as a User"}
        )

    } catch (error) {
        console.error('Error adding customer:', error);
        res.status(500).json({ message: 'Internal server error.' });
        logAuditEventAsync(
            'An Error occurred when a user tried to register',
            null,
            {message: error.message}
        )
    }
};


// Add new Product
export const addProduct = async (req, res) => {
    try {
        const { name, description, price, costPrice, imageURL, active } = req.body;

        // Validate required fields
        if (!name || !description || price == null) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Create a new product
        const newProduct = new Product({
            name,
            description,
            price,
            costPrice,
            imageURL,
            active,
        });

        const savedProduct = await newProduct.save();

        // Respond to the client
        res.status(201).json({ message: 'Product added successfully', product: savedProduct });

        // Log the audit event asynchronously
        logAuditEventAsync(
            'Product Added',
            null,
            { productName: savedProduct.name, message: 'Product added to site by Cosy Cookie Co Team' }
        );
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while adding the product' });
        logAuditEventAsync(
            'An Error occurred when CosyCookieCo tried to add a product',
            null,
            {message: error.message}
        )
}
};

// add a new order
export const addOrder = async (req, res) => {
    try {
        const { customerId, items } = req.body;

        // Validate customerId exists
        const customer = await User.findById(customerId);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found.' });
        }

        // Calculate total price and validate products
        let totalPrice = 0;
        for (const item of items) {
            const product = await Product.findById(item.productId);
            if (!product) {
                return res.status(404).json({ message: `Product with ID ${item.productId} not found.` });
            }

            totalPrice += item.quantity * item.price; // Calculate total price
        }

        // Create the new order
        const newOrder = new Order({
            customerId,
            items,
            totalPrice,
        });

        // Save the order to the database
        const savedOrder = await newOrder.save();

        // Send confirmation email to the customer
        const mailOptions = {
            from: process.env.EMAIL, // Your email address
            to: customer.email, // Customer's email address
            subject: `Order Confirmation - Order ID ${savedOrder._id}`,
            html: `
                <h2>Thank you for your order!</h2>
                <p>Order ID: ${savedOrder._id}</p>
                <p>Status: ${savedOrder.status}</p>
                <p>Total Price: $${totalPrice.toFixed(2)}</p>
                <h3>Order Details:</h3>
                <ul>
                    ${items
                        .map(
                            (item) =>
                                `<li>Product ID: ${item.productId}, Quantity: ${item.quantity}, Price: $${item.price.toFixed(
                                    2
                                )}</li>`
                        )
                        .join('')}
                </ul>
                <p>If you have any questions, please contact our support team.</p>
            `,
        };

        await transporter.sendMail(mailOptions);

        // Respond with success
        res.status(201).json({
            message: 'Order created successfully.',
            order: savedOrder,
        });

        // Log the successful order creation
        logAuditEventAsync('Add Order', customerId, {
            message: `Order created for customer ID ${customerId}.`,
        });
    } catch (error) {
        console.error('Error adding order:', error);

        // Respond with error
        res.status(500).json({ message: 'Internal server error.' });

        // Log the error
        logAuditEventAsync('Add Order Error', null, {
            message: error.message,
        });
    }
};

// send bulk emails to all customers
export const sendBulkEmail = async (req, res) => {
    try {
        const { headline, body, images } = req.body;

        // Fetch all customers
        const customers = await User.find({});
        if (!customers.length) {
            return res.status(404).json({ message: 'No customers found.' });
        }

        // Build the email HTML
        const emailHtml = `
            <h2>${headline}</h2>
            <p>${body}</p>
            ${images
                ?.map((image) => `<img src="${image}" alt="Attached Image" style="max-width: 100%; height: auto;">`)
                .join('') || ''}
        `;

        // Send email to all customers
        const emailPromises = customers.map((customer) =>
            transporter.sendMail({
                from: process.env.EMAIL,
                to: customer.email,
                subject: headline,
                html: emailHtml,
            })
        );

        await Promise.all(emailPromises);

        res.status(200).json({ message: 'Bulk email sent to all customers.' });
    } catch (error) {
        console.error('Error sending bulk email:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};