import express, { Request, Response, Router } from 'express';
import { UnimplementedError } from '../exceptions/UnimplementedError';

const fbTokenRoute: Router = express.Router()

fbTokenRoute.post('/', (req: Request, res: Response): void => {
    throw new UnimplementedError();
});

// Get all alerts
fbTokenRoute.get('/', (req: Request, res: Response): void => {
    throw new UnimplementedError();
});

// Get alert by id
fbTokenRoute.get('/:id', (req: Request, res: Response): void => {
    throw new UnimplementedError();
});

// Get all alerts from user
fbTokenRoute.get('/user/:userId', (req: Request, res: Response): void => {
    throw new UnimplementedError();
});

fbTokenRoute.patch('/:id', (req: Request, res: Response): void => {
    throw new UnimplementedError();
});

fbTokenRoute.delete('/:id', (req: Request, res: Response): void => {
    throw new UnimplementedError();
});

export default fbTokenRoute