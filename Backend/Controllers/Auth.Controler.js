import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../Models/User.Model.js';

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password.' });
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password.' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '8h' } 
        );

        // Respond with user data and token
        res.status(200).json({
            message: 'Login successful.',
            token,
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
                companyName: user.companyName,
                companyType: user.companyType,
                phoneNumber: user.phoneNumber,
                ABN: user.ABN,
                deliveryAddresses: user.deliveryAddresses,
                companyContacts: user.companyContacts
            },
        });

        // Log the event
        logAuditEventAsync(
            'User Login',
            user._id,
            { message: `${user.email} logged in successfully.` }
        );
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error.' });

        // Log the error
        logAuditEventAsync(
            'Login Error',
            null,
            { message: error.message }
        );
    }
};