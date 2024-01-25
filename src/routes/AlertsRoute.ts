import express, { Request, Response, Router } from 'express';
import { UnimplementedError } from '../exceptions/UnimplementedError';

const alertsRouter: Router = express.Router()

alertsRouter.post('/', (req: Request, res: Response): void => {
    throw new UnimplementedError();
});

// Get all alerts
alertsRouter.get('/', (req: Request, res: Response): void => {
    throw new UnimplementedError();
});

// Get alert by id
alertsRouter.get('/:id', (req: Request, res: Response): void => {
    throw new UnimplementedError();
});

// Get all alerts from user
alertsRouter.get('/user/:userId', (req: Request, res: Response): void => {
    throw new UnimplementedError();
});

alertsRouter.patch('/:id', (req: Request, res: Response): void => {
    throw new UnimplementedError();
});

alertsRouter.delete('/:id', (req: Request, res: Response): void => {
    throw new UnimplementedError();
});

export default alertsRouter