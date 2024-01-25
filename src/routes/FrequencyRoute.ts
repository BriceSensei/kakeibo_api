import express, { Request, Response, Router } from 'express';
import { UnimplementedError } from '../exceptions/UnimplementedError';

const frequencyRoute: Router = express.Router()

frequencyRoute.post('/', (req: Request, res: Response): void => {
    throw new UnimplementedError();
});

// Get all alerts
frequencyRoute.get('/', (req: Request, res: Response): void => {
    throw new UnimplementedError();
});

// Get alert by id
frequencyRoute.get('/:id', (req: Request, res: Response): void => {
    throw new UnimplementedError();
});

// Get all alerts from user
frequencyRoute.get('/user/:userId', (req: Request, res: Response): void => {
    throw new UnimplementedError();
});

frequencyRoute.patch('/:id', (req: Request, res: Response): void => {
    throw new UnimplementedError();
});

frequencyRoute.delete('/:id', (req: Request, res: Response): void => {
    throw new UnimplementedError();
});

export default frequencyRoute