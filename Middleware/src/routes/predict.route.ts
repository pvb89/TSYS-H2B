import { Router } from 'express';
import predictController from '../controllers/predict.controller'
import { upload } from '../helpers/multer.helper'

const predictRouter = Router();

predictRouter.post('/', [upload.single('file')] , predictController.predict);

export { predictRouter };
