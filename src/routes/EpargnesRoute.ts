import express, { Request, Response, Router } from 'express';
import { UnimplementedError } from '../exceptions/UnimplementedError';

const epargnesRoute: Router = express.Router()

epargnesRoute.post('/', (req: Request, res: Response): void => {
    throw new UnimplementedError();
});

// Get all alerts
epargnesRoute.get('/', (req: Request, res: Response): void => {
    throw new UnimplementedError();
});

// Get alert by id
epargnesRoute.get('/:id', (req: Request, res: Response): void => {
    throw new UnimplementedError();
});

// Get all alerts from user
epargnesRoute.get('/user/:userId', (req: Request, res: Response): void => {
    throw new UnimplementedError();
});

epargnesRoute.patch('/:id', (req: Request, res: Response): void => {
    throw new UnimplementedError();
});

epargnesRoute.delete('/:id', (req: Request, res: Response): void => {
    throw new UnimplementedError();
});

export default epargnesRoute