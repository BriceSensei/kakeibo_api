import express, { Request, Response, Router } from 'express';
import { UnimplementedError } from '../exceptions/UnimplementedError';
const userRoute: Router = express.Router()

userRoute.post('/', (req: Request, res: Response): void => {
    throw new UnimplementedError();
});

// Get all users
userRoute.get('/', (req: Request, res: Response): void => {
    res.json({message: "Madame Zazou"}).status(200);
});

// Get user by id
userRoute.get('/:id', (req: Request, res: Response): void => {
    const userId = req.params.id;
    console.log(userId);
});

userRoute.patch('/:id', (req: Request, res: Response): void => {
    throw new UnimplementedError();
});

userRoute.delete('/:id', (req: Request, res: Response): void => {
    throw new UnimplementedError();
});

export default userRoute