import { Request, Response } from "express";
/* Importing the connection to the database. */
import MongoConn from "../database/mongo.conn";

// Import response api ResponseApiHelper
import ResponseApiHelper from "../helpers/ResponseApiHelper";

// Import model
import Movement from "../models/movement.model";

class MovementService {
  public async getAll(req: Request, res: Response) {
    try {
      /* Checking if the connection to the database is ready. */
      if (MongoConn.getConnStatus() == 1) {
        throw "Connection to the database is not ready";
      }
      /* A query to the database. */
      const _data = await Movement.find({});
      /* Returning the response to the client. */
      const response = ResponseApiHelper.setResponse(_data, true, 200);
      return res.status(200).json(response);
    } catch (err) {
      /* Returning the response to the client. */
      const response = ResponseApiHelper.setResponse(err, false, 500);
      return res.status(500).json(response);
    }
  }
}

export default new MovementService();
