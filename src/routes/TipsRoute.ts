import express, { Request, Response, Router } from 'express';
import { UnimplementedError } from '../exceptions/UnimplementedError';

const tipsRoute: Router = express.Router()

tipsRoute.post('/', (req: Request, res: Response): void => {
    throw new UnimplementedError();
});

// Get all alerts
tipsRoute.get('/', (req: Request, res: Response): void => {
    throw new UnimplementedError();
});

// Get alert by id
tipsRoute.get('/:id', (req: Request, res: Response): void => {
    throw new UnimplementedError();
});

// Get all alerts from user
tipsRoute.get('/user/:userId', (req: Request, res: Response): void => {
    throw new UnimplementedError();
});

tipsRoute.patch('/:id', (req: Request, res: Response): void => {
    throw new UnimplementedError();
});

tipsRoute.delete('/:id', (req: Request, res: Response): void => {
    throw new UnimplementedError();
});

export default tipsRoute