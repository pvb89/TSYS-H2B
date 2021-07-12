import { Router } from 'express';
import dataController from '../controllers/data.controller';

const dataRouter = Router();

dataRouter.get('/storageLocation/:productDescription', dataController.getStorageLocation);

export { dataRouter };
