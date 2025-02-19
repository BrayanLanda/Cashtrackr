import type { Request, Response } from "express"
import Budget from "../models/Budget"

export class BudgetController {
    static getAll = async(req: Request, res: Response) => {

    }

    static create = async(req: Request, res: Response) => {
        try{
            const budget = new Budget(req.body);
            await budget.save();
            res.status(201).json('Budget successfully created');
        }catch(error){

        }
    }

    static getById = async(req: Request, res: Response) => {

    }

    static updateById = async(req: Request, res: Response) => {

    }

    static daleteById = async(req: Request, res: Response) => {

    }
}