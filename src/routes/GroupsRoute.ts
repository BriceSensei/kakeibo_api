import express, { Request, Response, Router } from 'express';
import { UnimplementedError } from '../exceptions/UnimplementedError';

export const groupsRoute: Router = express.Router()

groupsRoute.post('/', (req: Request, res: Response): void => {
    throw new UnimplementedError();
});

// Get all alerts
groupsRoute.get('/', (req: Request, res: Response): void => {
    throw new UnimplementedError();
});

// Get alert by id
groupsRoute.get('/:id', (req: Request, res: Response): void => {
    throw new UnimplementedError();
});

// Get all alerts from user
groupsRoute.get('/user/:userId', (req: Request, res: Response): void => {
    throw new UnimplementedError();
});

groupsRoute.patch('/:id', (req: Request, res: Response): void => {
    throw new UnimplementedError();
});

groupsRoute.delete('/:id', (req: Request, res: Response): void => {
    throw new UnimplementedError();
});

export default groupsRoute