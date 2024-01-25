import express, { Request, Response, Router } from 'express';
import { UnimplementedError } from '../exceptions/UnimplementedError';

const categoryRoute: Router = express.Router()

categoryRoute.post('/', (req: Request, res: Response): void => {
    throw new UnimplementedError();
});

// Get all alerts
categoryRoute.get('/', (req: Request, res: Response): void => {
    throw new UnimplementedError();
});

// Get alert by id
categoryRoute.get('/:id', (req: Request, res: Response): void => {
    throw new UnimplementedError();
});

// Get all alerts from user
categoryRoute.get('/user/:userId', (req: Request, res: Response): void => {
    throw new UnimplementedError();
});

categoryRoute.patch('/:id', (req: Request, res: Response): void => {
    throw new UnimplementedError();
});

categoryRoute.delete('/:id', (req: Request, res: Response): void => {
    throw new UnimplementedError();
});

export default categoryRoute