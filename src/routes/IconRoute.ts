import express, { Request, Response, Router } from 'express';
import { UnimplementedError } from '../exceptions/UnimplementedError';
import { IconsController } from '@controller/IconController';


const iconRoute: Router = express.Router();
const iconsController : IconsController = new IconsController;

iconRoute.post('/', iconsController.createNewIcon);
iconRoute.get('/', iconsController.getAllIcons);
iconRoute.get('/:id', iconsController.getIconById);

// Get all alerts from user
iconRoute.get('/user/:userId', (req: Request, res: Response): void => {
    throw new UnimplementedError();
});

iconRoute.patch('/:id', iconsController.updateOneIcon);
iconRoute.delete('/:id', iconsController.deleteOneIcon);

export default iconRoute