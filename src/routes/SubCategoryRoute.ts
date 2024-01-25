import express, { Request, Response, Router } from 'express';
import { UnimplementedError } from '../exceptions/UnimplementedError';

const subCategoryRoute: Router = express.Router()

subCategoryRoute.post('/', (req: Request, res: Response): void => {
    throw new UnimplementedError();
});

// Get all alerts
subCategoryRoute.get('/', (req: Request, res: Response): void => {
    throw new UnimplementedError();
});

// Get alert by id
subCategoryRoute.get('/:id', (req: Request, res: Response): void => {
    throw new UnimplementedError();
});

// Get all alerts from user
subCategoryRoute.get('/user/:userId', (req: Request, res: Response): void => {
    throw new UnimplementedError();
});

subCategoryRoute.patch('/:id', (req: Request, res: Response): void => {
    throw new UnimplementedError();
});

subCategoryRoute.delete('/:id', (req: Request, res: Response): void => {
    throw new UnimplementedError();
});

export default subCategoryRoute