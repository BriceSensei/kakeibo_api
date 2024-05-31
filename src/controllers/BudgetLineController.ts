
import { Request, Response } from "express";
import { BudgetLineService } from "../services/budgetLineService";
import { BudgetLines } from "@prisma/client";
import { Users } from "@prisma/client";

interface CustomRequest extends Request{
    // Utilisation de l'interface Users pour annoter le type de la propriété 'user'
    user?: Users
}
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
           res.status(201).json(budgetLine); 
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
            return res.json(budgetLineDeleted);
        } catch (error) {
            const errMsg = {
                status: 500,
                error: error,
                message: "Fail to delete budgetLine in database"
            }
           res.status(500).send(errMsg);
        }
    }

    async getAnnualExpenses(req: CustomRequest, res:Response){
        const budgetLineMethod: BudgetLineService = new BudgetLineService();
        const { year } = req.query      
        try{         
            if(!year || isNaN(Number(year))){
                return res.status(400).json({message: "Invalid year parameter"});
            }

            const userId: number | undefined = req.user?.id;
            if(userId === undefined){
                return res.status(401).json({message: 'User not authentificated'});
            }

            const expenses = await budgetLineMethod.getAnnualExpenses(userId, Number(year));
            if(expenses.length === 0){
                return res.status(200).json({message: 'No expenses found for the specified year'});
            }
            return res.status(200).json(expenses);
        }catch(error){
            return res.status(500).json({message: 'Failed to retrieve annual expenses'});
        }
    }

    async getMonthlyExpenses(req: CustomRequest, res:Response){
        const budgetLineMethod: BudgetLineService = new BudgetLineService();
        const { year, month } = req.query      
        try{         
            if(!year || !month || isNaN(Number(year)) || isNaN(Number(month))){
                return res.status(400).json({message: "Invalid year parameter"});
            }

            const userId: number | undefined = req.user?.id;
            if(userId === undefined){
                return res.status(401).json({message: 'User not authentificated'});
            }
            
            const expenses = await budgetLineMethod.getAnnualExpenses(userId, Number(year));
            if(expenses.length === 0){
                return res.status(200).json({message: 'No expenses found for the specified year'});
            }
            return res.status(200).json(expenses);
        }catch(error){
            return res.status(500).json({message: 'Failed to retrieve annual expenses'});
        }
    }
}
    

   
    