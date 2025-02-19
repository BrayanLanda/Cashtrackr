import type { Request, Response } from "express"
import Budget from "../models/Budget"

export class BudgetController {
    static getAll = async(req: Request, res: Response) => {
        try{
            const budget = await Budget.findAll({
                order: [
                    ['CreateAt', 'DESC']
                ],
                //TODO: Filter by user
            })
            res.json(budget);
        }catch(error){
            res.status(500).json({error: 'There was an error'});
        }
    }

    static create = async(req: Request, res: Response) => {
        try{
            const budget = new Budget(req.body);
            res.status(201).json('Budget successfully created');
            await budget.save();
        }catch(error){
            res.status(500).json({error: 'There was an error'});
        }
    }

    static getById = async(req: Request, res: Response) => {
        res.json(req.budget);
    }

    static updateById = async(req: Request, res: Response) => {
        await req.budget.update(req.body);
        res.json('Budget successfully updated')
    }

    static daleteById = async(req: Request, res: Response) => {
        await req.budget.destroy();
            res.json('Budget successfully deleted');
    }
}