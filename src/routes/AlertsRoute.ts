import express, { Request, Response, Router } from 'express';
import { UnimplementedError } from '../exceptions/UnimplementedError';
import { AlertController } from '@controller/AlertsController';


const alertsRoute: Router = express.Router()
const alertController: AlertController = new AlertController

alertsRoute.post('/', alertController.createNewAlert);
alertsRoute.get('/', alertController.getAllAlertes);
alertsRoute.get('/:id', alertController.getCategoryById);

alertsRoute.get('/user/:userId', (req: Request, res: Response): void => {
    throw new UnimplementedError();
});

alertsRoute.patch('/:id', alertController.updateOneAlert);
alertsRoute.delete('/:id', alertController.deleteOneAlert);

export default alertsRoute