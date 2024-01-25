import express, { Request, Response, Router } from 'express';
import { UnimplementedError } from '../exceptions/UnimplementedError';

const userRoute: Router = express.Router()

userRoute.post('/', (req: Request, res: Response): void => {
    throw new UnimplementedError();
});

// Get all alerts
userRoute.get('/', (req: Request, res: Response): void => {
    throw new UnimplementedError();
});

// Get alert by id
userRoute.get('/:id', (req: Request, res: Response): void => {
    throw new UnimplementedError();
});

// Get all alerts from user
userRoute.get('/user/:userId', (req: Request, res: Response): void => {
    throw new UnimplementedError();
});

userRoute.patch('/:id', (req: Request, res: Response): void => {
    throw new UnimplementedError();
});

userRoute.delete('/:id', (req: Request, res: Response): void => {
    throw new UnimplementedError();
});

export default userRoute