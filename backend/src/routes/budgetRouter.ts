import { Router } from "express";
import { BudgetController } from "../controllers/BudgetController";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { validateBudgetExist, validateBudgetId, validateBudgetInput } from "../middleware/budget";

const router = Router();

router.get('/', BudgetController.getAll);

router.param('budgetId', validateBudgetId);
router.param('budgetId', validateBudgetExist);

router.post('/', 
    validateBudgetInput,
    BudgetController.create);

router.get('/:budgetId', BudgetController.getById);


router.put('/:budgetId', 
    validateBudgetInput,
    BudgetController.updateById);


router.delete('/:budgetId', BudgetController.daleteById);

export default router;