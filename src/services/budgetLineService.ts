import { Request, Response } from "express";
import { BudgetLinesInterface } from "../interfaces/BudgetLines";
import { UnimplementedError} from "../exceptions/UnimplementedError";
import { BudgetLines } from "@prisma/client";
import prisma from "@prisma/prisma";

class BudgetLineClass{

    constructor(){
    }

    getAllBudgetLine = async (req: Request, res: Response): Promise<void> => {
        const budgetLines = await prisma.budgetLines.findMany();
    }

    getBudgetLineById = async (id:number): Promise<BudgetLines | null> => {
        const BudgetLineById = await prisma.budgetLines.findUnique({
            where: {
                id: id
            }
        });
        return BudgetLineById; 
    }

    createNewBudgetLine = async (req: Request, res: Response): Promise<BudgetLines | null> => {
        const budgetLineData: BudgetLinesInterface = req.body;
        const newBudgetLine = await prisma.budgetLines.create({
            data: budgetLineData
        });
        return newBudgetLine;
    }

    updateOneBudgetLine = async (req: Request, res: Response): Promise<BudgetLines | null> => {
        const { id } = req.params;
        const budgetLineData: BudgetLinesInterface = req.body;
        const updatedBudgetLine = await prisma.budgetLines.update({
            where: { id: parseInt(id) },
            data: budgetLineData
        });
        return updatedBudgetLine;
    }

    deleteOneBudgetLine = async (req: Request, res: Response): Promise<BudgetLines | null> => {
        const { id } = req.params;
       const deleteBudgetLine = await prisma.budgetLines.delete({
            where: { id: parseInt(id) }
        });
        return deleteBudgetLine;
    }
}

export{BudgetLineClass};