import { Request, Response, NextFunction } from "express";
import { body, param, validationResult } from "express-validator";
import Expense from "../models/Expense";

declare global {
    namespace Express {
        interface Request {
            expense?: Expense
        }
    }
}

export const validateExpenseInput = async (req: Request, res: Response, next: NextFunction) => {
    await body('name').notEmpty().withMessage('Name cannot be empty').run(req)
    await body('amount').notEmpty().withMessage('Quantity cannot be empty')
        .isNumeric().withMessage('Quantity invalid')
        .custom(value => value > 0).withMessage('Expense should be older to 0').run(req);

    next()
}

export const validateExpenseId = async (req: Request, res: Response, next: NextFunction) => {
    await param('expenseId').isInt()
        .custom(value => value > 0).withMessage('Id not valid').run(req);

    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() })
        return
    }
    next()
}

export const validateExpenseExists = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { expenseId } = req.params;
        const expense = await Expense.findByPk(expenseId);
        if(!expense){
            const error = new Error('Expense not found');
            res.status(404).json({error: error.message});
            return
        }
       req.expense = expense

        next();
    } catch (error) {
        res.status(500).json({error: 'There was an error'});
    }
}