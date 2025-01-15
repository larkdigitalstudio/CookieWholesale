import bcrypt from 'bcryptjs';
import User from '../Models/User.Model.js';
import Product from '../Models/Product.Model.js';
import logAuditEventAsync from '../Middleware/AuditLog.js';

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