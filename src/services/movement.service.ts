import { Request, Response } from "express";
//import conn from "../db/index";
//import { validationResult } from "express-validator";
import MongoConn from "../database/mongo.conn";

class MovementService {
  public async getAll(req: Request, res: Response) {
    try {
      console.log(MongoConn.getConnStatus());
      return res.status(200).json({
        movement: "true",
      });
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}

export default new MovementService();
