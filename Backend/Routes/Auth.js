import express from 'express';
import {loginUser} from '../Controllers/Auth.Controler.js';
import {loginValidator, validateRequest} from '../Middleware/LoginValidation.js';

const router = express.Router();

// routes
router.post('/login', loginValidator, validateRequest, loginUser);

export default router;