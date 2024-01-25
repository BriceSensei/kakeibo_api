import express, { Request, Response, Router } from 'express';
import { UnimplementedError } from '../exceptions/UnimplementedError';

const iconRoute: Router = express.Router()

iconRoute.post('/', (req: Request, res: Response): void => {
    throw new UnimplementedError();
});

// Get all alerts
iconRoute.get('/', (req: Request, res: Response): void => {
    throw new UnimplementedError();
});

// Get alert by id
iconRoute.get('/:id', (req: Request, res: Response): void => {
    throw new UnimplementedError();
});

// Get all alerts from user
iconRoute.get('/user/:userId', (req: Request, res: Response): void => {
    throw new UnimplementedError();
});

iconRoute.patch('/:id', (req: Request, res: Response): void => {
    throw new UnimplementedError();
});

iconRoute.delete('/:id', (req: Request, res: Response): void => {
    throw new UnimplementedError();
});

export default iconRoute