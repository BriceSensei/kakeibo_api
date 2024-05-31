import express, { Request, Response, Router } from 'express';
import { UnimplementedError } from '../exceptions/UnimplementedError';
import {TokenController} from "@controller/TokenController";

const tokenRoute: Router = express.Router()

tokenRoute.post('/token');

// Get all alerts
tokenRoute.get('/', (req: Request, res: Response): void => {
    throw new UnimplementedError();
});

// Get alert by id
tokenRoute.get('/:id', (req: Request, res: Response): void => {
    throw new UnimplementedError();
});

// Get all alerts from user
tokenRoute.get('/user/:userId', (req: Request, res: Response): void => {
    throw new UnimplementedError();
});

tokenRoute.patch('/:id', (req: Request, res: Response): void => {
    throw new UnimplementedError();
});

tokenRoute.delete('/:id', (req: Request, res: Response): void => {
    throw new UnimplementedError();
});

export default tokenRoute