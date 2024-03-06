import express, { Request, Response, Router } from 'express';
import { UnimplementedError } from '../exceptions/UnimplementedError';
import { CategoryController } from '@controller/CategoryController';


const categoryRoute: Router = express.Router()
const categoryController: CategoryController = new CategoryController;

categoryRoute.post('/', categoryController.createNewCategory);

// Get all categories
categoryRoute.get('/', categoryController.getAllCategories);

// Get category by id
categoryRoute.get('/:id', categoryController.getCategoryById);

// Get all category from user
categoryRoute.get('/category/:userId', (req: Request, res: Response): void => {
    throw new UnimplementedError();
});

categoryRoute.patch('/:id', (req: Request, res: Response): void => {
    throw new UnimplementedError();
});

categoryRoute.delete('/:id', (req: Request, res: Response): void => {
    throw new UnimplementedError();
});

export default categoryRoute