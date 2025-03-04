import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { body } from "express-validator";
import { handleInputErrors } from "../middleware/validation";

 const router = Router();

 router.post('/create-account', 
    body('name').notEmpty().withMessage('Name cannot be empty'),
    body('password').isLength({min: 8}).withMessage('Password is too short, min 8 characters'),
    body('email').isEmail().withMessage('E-mail not valid'),
    handleInputErrors,
    AuthController.createAccount);

 export default router;