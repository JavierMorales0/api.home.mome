import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import moment from "moment";
/* Importing the connection to the database. */
import MongoConn from "../database/mongo.conn";

// Import response api ResponseApiHelper
import ResponseApiHelper from "../helpers/ResponseApiHelper";

// Import model
import User from "../models/user.model";

class AuthService {
  public async login(req: Request, res: Response) {
    // DECLARE CONST CONTEXT
    const CONTEXT = "auth.controller - login";
    try {
      const { email } = req.body;
      const _match = await User.findOne({ email });
      if (!_match) {
        throw { message: "User does not have an account yet" };
      }
      /* Getting the secret key and expiration time from the environment variables. */
      const SECRET_KEY: string = process.env.JWT_SECRET_KEY ?? "";
      const EXPIRATION_TIME: string = process.env.JWT_EXPIRATION_TIME ?? "";
      /* Checking if the secret key and expiration time are set in the environment
     variables. */
      if (!SECRET_KEY || !EXPIRATION_TIME) {
        throw { message: "JWT variables problem" };
      }
      /* Creating a token with the user information and the expiration time. */
      const token = sign(
        {
          _id: _match._id?.toString(),
          email: _match.email,
          firstName: _match.firstName,
          lastName: _match.lastName,
          jwtCreationDate: moment().toISOString(),
        },
        SECRET_KEY,
        {
          expiresIn: EXPIRATION_TIME,
        }
      );
      const response = ResponseApiHelper.setResponse(
        {
          email: _match.email,
          token,
        },
        CONTEXT,
        false,
        500
      );
      return res.status(200).json(response);
    } catch (err) {
      console.log(err);
      /* Returning the response to the client. */
      const response = ResponseApiHelper.setResponse(err, CONTEXT, false, 500);
      return res.status(500).json(response);
    }
  }
}

export default new AuthService();
