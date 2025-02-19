import { Router } from "express";
import { BudgetController } from "../controllers/BudgetController";
import { validateBudgetExist, validateBudgetId, validateBudgetInput } from "../middleware/budget";
import { ExpensesController } from "../controllers/ExpenseController";
import { validateExpenseExists, validateExpenseId, validateExpenseInput } from "../middleware/expense";
import { handleInputErrors } from "../middleware/validation";

const router = Router();
router.param('budgetId', validateBudgetId);
router.param('budgetId', validateBudgetExist);
router.param('expenseId', validateExpenseId);
router.param('expenseId', validateExpenseExists);

/**Architecture ROA - Recurses*/
//** Routes for budgets */
router.get('/', BudgetController.getAll);
router.post('/', 
    validateBudgetInput,
    BudgetController.create);
router.get('/:budgetId', BudgetController.getById);
router.put('/:budgetId', 
    validateBudgetInput,
    BudgetController.updateById);
router.delete('/:budgetId', BudgetController.daleteById);

/** Route for expenses */
router.post('/:budgetId/expenses', 
    validateExpenseInput,
    handleInputErrors,
    ExpensesController.create);
router.get('/:budgetId/expenses/:expenseId', ExpensesController.getById);
router.put('/:budgetId/expenses/:expenseId', 
    validateExpenseInput,
    handleInputErrors,
    ExpensesController.updateById);
router.delete('/:budgetId/expenses/:expenseId', ExpensesController.deleteById);

export default router;