import User from '../Models/User.Model.js'; // Adjust the path as necessary
import { logAuditEventAsync } from '../utils/auditLogger.js'; // Adjust the path as necessary

export const deleteUser = async (req, res) => {
    try {
        // Extract userId from request parameters
        const { userId } = req.params;

        // Find and delete the user
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            // If the user doesn't exist
            return res.status(404).json({ message: 'User not found.' });
        }

        // Respond with success message
        res.status(200).json({
            message: `User with ID ${userId} deleted successfully.`,
            user: deletedUser,
        });

        // Log the successful deletion
        logAuditEventAsync('Delete User', userId, {
            message: `User with ID ${userId} was deleted.`,
        });
    } catch (error) {
        console.error('Error deleting user:', error);

        // Respond with error message
        res.status(500).json({ message: 'Internal server error.' });

        // Log the error
        logAuditEventAsync('Delete User Error', null, {
            message: error.message,
        });
    }
};