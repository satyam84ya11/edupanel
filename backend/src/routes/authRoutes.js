import express from 'express';
import { registerSchool, login } from '../controllers/authController.js';

const router = express.Router();

// POST /auth/register-school
router.post('/register-school', registerSchool);

// POST /auth/login
router.post('/login', login);

export default router;


