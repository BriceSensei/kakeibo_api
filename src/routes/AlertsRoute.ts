import express, { Request, Response, Router } from 'express';

import { AlertController } from '@controller/AlertsController';

import { UnimplementedError } from '@exception/UnimplementedError';


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