import express, { Request, Response, Router } from 'express';
import { UnimplementedError } from '../exceptions/UnimplementedError';

const budgetLineRoute: Router = express.Router()

budgetLineRoute.post('/', (req: Request, res: Response): void => {
    throw new UnimplementedError();
});

// Get all alerts
budgetLineRoute.get('/', (req: Request, res: Response): void => {
    throw new UnimplementedError();
});

// Get alert by id
budgetLineRoute.get('/:id', (req: Request, res: Response): void => {
    throw new UnimplementedError();
});

// Get all alerts from user
budgetLineRoute.get('/user/:userId', (req: Request, res: Response): void => {
    throw new UnimplementedError();
});

budgetLineRoute.patch('/:id', (req: Request, res: Response): void => {
    throw new UnimplementedError();
});

budgetLineRoute.delete('/:id', (req: Request, res: Response): void => {
    throw new UnimplementedError();
});

export default budgetLineRoute