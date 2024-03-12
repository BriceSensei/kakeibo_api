import express, { Request, Response, Router } from 'express';
import { UnimplementedError } from '../exceptions/UnimplementedError';
import { AlertController } from '@controller/AlertsController';


const alertsRoute: Router = express.Router()
const alertController: AlertController = new AlertController

alertsRoute.post('/', (req: Request, res: Response): void => {
    throw new UnimplementedError();
});

alertsRoute.get('/', alertController.getAllAlertes);

alertsRoute.get('/:id', (req: Request, res: Response): void => {
    throw new UnimplementedError();
});

alertsRoute.get('/user/:userId', (req: Request, res: Response): void => {
    throw new UnimplementedError();
});

alertsRoute.patch('/:id', (req: Request, res: Response): void => {
    throw new UnimplementedError();
});

alertsRoute.delete('/:id', (req: Request, res: Response): void => {
    throw new UnimplementedError();
});

export default alertsRoute