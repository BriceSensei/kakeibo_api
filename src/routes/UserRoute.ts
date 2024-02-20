import express, { Request, Response, Router } from 'express';
import { UnimplementedError } from '../exceptions/UnimplementedError';
import { UserController } from '@controller/UserController';
import { UserClass } from '../services/userService';
const userRoute: Router = express.Router()

userRoute.post('/', (req: Request, res: Response): void => {
    res.status(201).send()
});

// Get all users
// userRoute.get('/', (req: Request, res: Response): void => {
    //     res.json(UserController.getUsers()).status(200);
    // });
    const userController: UserController = new UserController();
    userRoute.get("/", userController.getAllUsers);

// // Get user by id
// userRoute.get('/:id', (req: Request, res: Response): void => {
//     const userId = UserController.getUser(Number(req.params.id));
//     res.json(userId);
    
// });

// userRoute.patch('/:id', (req: Request, res: Response): void => {
    
    
// });

// userRoute.delete('/:id', (req: Request, res: Response): void => {
//     UserController.deleteUser(Number(req.params.id));
//     res.status(204).send();
// });

export default userRoute