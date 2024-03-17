import express, { Request, Response, Router } from 'express';
import { UnimplementedError } from '../exceptions/UnimplementedError';
import { BudgetLineController } from '@controller/BudgetLineController';

const budgetLineRoute: Router = express.Router()
const budgetLineController : BudgetLineController= new BudgetLineController;

budgetLineRoute.post('/', budgetLineController.createNewBudgetLine);
budgetLineRoute.get('/', budgetLineController.getAllBudgetLines);
budgetLineRoute.get('/:id', budgetLineController.getBudgetLineById);

// Get all alerts from user
budgetLineRoute.get('/user/:userId', (req: Request, res: Response): void => {
    throw new UnimplementedError();
});

budgetLineRoute.patch('/:id', budgetLineController.updateOneBudgetLine);
budgetLineRoute.delete('/:id', budgetLineController.deleteOneBudgebudgetLine);

export default budgetLineRoute