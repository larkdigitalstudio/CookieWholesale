import express from 'express';
import { deleteUser } from '../Controllers/Delete.Controller';

const router = express.Router();

// routes
//delete User
router.delete('/deleteUser/:userId', deleteUser);

export default router;