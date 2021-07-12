import fs from 'fs';
import * as tfn from '@tensorflow/tfjs-node';
import { Request, Response } from "express";
import { resultIF } from '../helpers/interfaces.helper'
import PredictService from "../services/predict.service"

const predictService: PredictService = new PredictService();

class predictController {
  private static file: string = "./src/images/test-img.jpg";
  private static result: resultIF

  public static predict = async (req: Request, res: Response, next: any) => {
    try {
      const img = predictService.getImg(predictController.file);
      const model: tfn.GraphModel = await predictService.loadModel();
      
      const prediction = await (model.predict(img) as any).data();
      predictController.result = predictService.getTop3(prediction)

      fs.unlinkSync(predictController.file);
      model.dispose();

      console.log("Result:", predictController.result);

    } catch (error) {
      console.log(error)
      res.status(500);
      res.json({
        success: false,
        message: "Error"
      });
    }
    res.json({
      success: true,
      message: "All fine",
      data: predictController.result
    });
  }
}

export default predictController;