import { json, type Request, type Response } from 'express'
import Expense from '../models/Expense';

export class ExpensesController {
  

    static create = async (req: Request, res: Response) => {
        try {
            const expense = new Expense(req.body);
            expense.budgetId = req.budget.id;
            await expense.save();
            res.status(201).json('Expense successfully created');
        } catch (error) {
            res.status(500).json({error: 'There was an error'});
        }
    }
  
    static getById = async (req: Request, res: Response) => {
        res.json(req.expense);
    }

    static updateById = async (req: Request, res: Response) => {
       await req.expense.update(req.body);
       res.json('Expense successfully updated');
    }
  
    static deleteById = async (req: Request, res: Response) => {
        await req.expense.destroy();
        res.json('Expense successfully deleted');
    }   
}