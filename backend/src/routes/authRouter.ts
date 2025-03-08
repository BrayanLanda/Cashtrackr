import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { limiter } from "../config/limiter";
import { authenticate } from "../middleware/auth";

const router = Router();
router.use(limiter);

router.post('/create-account',
   body('name').notEmpty().withMessage('Name cannot be empty'),
   body('password').isLength({ min: 8 }).withMessage('Password is too short, min 8 characters'),
   body('email').isEmail().withMessage('E-mail not valid'),
   handleInputErrors,
   AuthController.createAccount
);

router.post('/confirm-account',
   body('token').notEmpty().isLength({min: 6, max: 6}).withMessage('Token invalid'),
   AuthController.confirmAccount
);

router.post('/login',
   body('email').isEmail().withMessage('E-mail not valid'),
   body('password').notEmpty().withMessage('Password cannot be empty'),
   AuthController.login
);

router.post('/forgot-password',
   body('email').isEmail().withMessage('E-mail not valid'),
   handleInputErrors,
   AuthController.forgotPassword
);

router.post('/validate-token',
   body('token').notEmpty().isLength({min: 6, max: 6}).withMessage('Token invalid'),
   AuthController.validateToken
);

router.post('/reset-password/:token',
   param('token').notEmpty().isLength({min: 6, max: 6}).withMessage('Token invalid'),
   body('password').isLength({ min: 8 }).withMessage('Password is too short, min 8 characters'),
   handleInputErrors,
   AuthController.resetPasswordWithToken
);

router.get('/user', 
   authenticate,
   AuthController.user
);

export default router;