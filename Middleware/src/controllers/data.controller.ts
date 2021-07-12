import { Request, Response } from "express";
import DataService from "../services/data.service"

const dataService: DataService = new DataService();

class dataController {

  public static getStorageLocation = async (req: Request, res: Response, next: any) => {
    try {
      const productId = await dataService.getProductId(req.params.productDescription.toLowerCase());
      // storageLocation = await dataService.getStorageLocation(productId)
      const storageLocation = await dataService.getMapping(productId)
      if (storageLocation) {
        res.json({
          success: true,
          message: "All fine",
          data: {
            passage: storageLocation.passage,
            shelf: storageLocation.shelf
          }
        });
      } else {
        res.status(500);
        res.json({
          success: false,
          message: "No Mapping"
        });
      }
    } catch (error) {
      console.log("Error:", error);
      res.status(500);
      res.json({
        success: false,
        message: "Error"
      });
    }
  }
}

export default dataController;