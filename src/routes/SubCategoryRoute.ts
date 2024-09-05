import express, { Request, Response, Router } from 'express';
import { UnimplementedError } from '../exceptions/UnimplementedError';
import { SubCategoriesController } from '@controller/SubCategoryController';

const subCategoryRoute: Router = express.Router()
const subCategoriesController : SubCategoriesController = new SubCategoriesController

subCategoryRoute.post('/', subCategoriesController.createNewSubCategory);
subCategoryRoute.get('/', subCategoriesController.getAllSubCategories);
subCategoryRoute.get('/:id', subCategoriesController.getSubCategoryById);

// Get all alerts from user
subCategoryRoute.get('/user/:userId', (req: Request, res: Response): void => {
    throw new UnimplementedError();
});

subCategoryRoute.patch('/:id', subCategoriesController.updateOneSubCategory)
subCategoryRoute.delete('/:id', subCategoriesController.deleteSubCategory);

export default subCategoryRoute