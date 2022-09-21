import { Request, Response } from "express";
import userController from "../controllers/user.controller";
/* Importing the connection to the database. */
import MongoConn from "../database/mongo.conn";

// Import response api ResponseApiHelper
import ResponseApiHelper from "../helpers/ResponseApiHelper";

// Import model
import User from "../models/user.model";

class UserService {
  public async getAll(req: Request, res: Response) {
    // DECLARE CONST CONTEXT
    const CONTEXT = "user.controller - getAll";
    try {
      /* A query to the database. */
      const _data = await User.find({});
      /* Returning the response to the client. */
      const response = ResponseApiHelper.setResponse(_data, CONTEXT, true, 200);
      return res.status(200).json(response);
    } catch (err) {
      /* Returning the response to the client. */
      const response = ResponseApiHelper.setResponse(err, CONTEXT, false, 500);
      return res.status(500).json(response);
    }
  }
  public async getSpecific(req: Request, res: Response) {
    // DECLARE CONST CONTEXT
    const CONTEXT = "user.controller - getSpecific";
    try {
      // Get params in the route
      const { id } = req.params;
      /* A query to the database. */
      const _data = await User.findById(id);
      if (!_data) {
        throw { message: `User with ID: ${id} does not exists` };
      }
      /* Returning the response to the client. */
      const response = ResponseApiHelper.setResponse(_data, CONTEXT, true, 200);
      return res.status(200).json(response);
    } catch (err) {
      /* Returning the response to the client. */
      const response = ResponseApiHelper.setResponse(err, CONTEXT, false, 500);
      return res.status(500).json(response);
    }
  }

  public async create(req: Request, res: Response) {
    // DECLARE CONST CONTEXT
    const CONTEXT = "user.controller - create";
    try {
      // Get all the params on the body
      const { firstName, lastName, email, avatar } = req.body;
      /* A query to the database. */
      const _user = await User({
        firstName,
        lastName,
        email,
        avatar,
      });
      await _user.save();
      /* Returning the response to the client. */
      const response = ResponseApiHelper.setResponse(_user, CONTEXT, true, 200);
      return res.status(200).json(response);
    } catch (err) {
      /* Returning the response to the client. */
      const response = ResponseApiHelper.setResponse(err, CONTEXT, false, 500);
      return res.status(500).json(response);
    }
  }
}

export default new UserService();
