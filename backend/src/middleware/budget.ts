import type { Request, Response, NextFunction } from "express";
import { body, param, validationResult } from "express-validator";
import Budget from "../models/Budget";

declare global {
    namespace Express {
        interface Request {
            budget?: Budget
        }
    }
}

export const validateBudgetId = async (req: Request, res: Response, next: NextFunction) => {
     await param('budgetId').isInt().withMessage('Id not valid')
    .custom(value => value > 0).withMessage('Id not valid').run(req);

     let errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() })
            return
        }

    next();
}

export const validateBudgetExist = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { budgetId } = req.params;
        const budget = await Budget.findByPk(budgetId);
        if(!budget){
            const error = new Error('Budget not found');
            res.status(404).json({error: error.message});
            return
        }
       req.budget = budget

        next();
    } catch (error) {
        res.status(500).json({error: 'There was an error'});
    }
}

export const validateBudgetInput = async (req: Request, res: Response, next: NextFunction) => {
    
    await body('name').notEmpty().withMessage('Name cannot be empty').run(req)
    await body('amount').notEmpty().withMessage('Quantity cannot be empty')
        .isNumeric().withMessage('Quantity invalid')
        .custom(value => value > 0).withMessage('Budget should be older to 0').run(req);
    
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() })
        return
    }
    next()
}