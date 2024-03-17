
import { Request, Response } from "express";
import { BudgetLineService } from "../services/budgetLineService";
import { BudgetLines } from "@prisma/client";
export class BudgetLineController {


    async getAllBudgetLines(req:Request, res:Response): Promise<void>{
        const allBudgetLines : BudgetLineService = new BudgetLineService();

        try {
            const budgetLines: BudgetLines[] = await allBudgetLines.getAllBudgetLines();
            res.json(budgetLines);
        } catch (error) {
            const errMsg = {
                status: 500,
                error: error,
                message: "Fail to get all budgetLines"               
            }

            res.status(500).send(errMsg);
        }
    }

    async getBudgetLineById(req: Request, res: Response):Promise<void>{
        const budgetLineMethod : BudgetLineService = new BudgetLineService();
        const budgetLineId : number = parseInt(req.params.id);

        try {
            const budgetLine : BudgetLines = await budgetLineMethod.getOneBudgetLine(budgetLineId);
            res.json(budgetLine);
        } catch (error) {
            const errMsg = {
                status: 500,
                error: error,
                message: "Impossible de récuperer l'id d'une alert"
            }
            res.status(500).send(errMsg);
        }
    }

    async createNewBudgetLine(req: Request, res: Response): Promise<void>{
        const budgetLineMethod : BudgetLineService = new BudgetLineService();
        const budgetLineData: BudgetLines = { ...req.body};

        try {
           const budgetLine : BudgetLines = await budgetLineMethod.createOneBudgetLine(budgetLineData);
           res.json(budgetLine); 
        } catch (error) {
            const errMsg = {
                status: 500,
                error: error,
                message: "Echec leur de la creation d'une nouvelle ligne de budget"
            }
            res.status(500).send(errMsg);
        }
    }


    async updateOneBudgetLine(req: Request, res:Response): Promise<void>{
        const budgetLineMethod: BudgetLineService = new BudgetLineService();
        const budgetLineData: BudgetLines = req.body;
        const budgetLineId: number = parseInt(req.params.id);

        try {
            const budgetLineUpdate: BudgetLines = await budgetLineMethod.updateBudgetLine(budgetLineId, budgetLineData)
            res.json(budgetLineUpdate)
        } catch (error){
            const errMsg={
                status: 500,
                error: error,
                message: "Fail to update one budgetLine"
            }
            res.status(500).send(errMsg);
        }
    }

    async deleteOneBudgebudgetLine(req: Request, res:Response){
        const budgetLineMethod: BudgetLineService = new BudgetLineService();
        const budgetLineId : number = parseInt(req.params.id)

        try {
            const budgetLineDeleted: BudgetLines = await budgetLineMethod.deleteOneBudgetLine(budgetLineId);
            res.json(budgetLineDeleted);
        } catch (error) {
            const errMsg = {
                status: 500,
                error: error,
                message: "Fail to delete budgetLine in database"
            }
            res.status(500).send(errMsg);
        }
    }
}
    

   
    