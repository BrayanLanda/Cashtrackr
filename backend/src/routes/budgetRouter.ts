import { Router } from "express";
import { BudgetController } from "../controllers/BudgetController";
import { body } from "express-validator";

const router = Router();

router.get('/', BudgetController.getAll);

router.post('/', 
    body('name').notEmpty().withMessage('Name cannot be empty'),
    BudgetController.create);

router.get('/:id', BudgetController.getById);
router.put('/:id', BudgetController.updateById);
router.delete('/:id', BudgetController.daleteById);

export default router;