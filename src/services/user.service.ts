import { Request, Response } from 'express'
import userController from '../controllers/user.controller'
/* Importing the connection to the database. */
import MongoConn from '../database/mongo.conn'

// Import response api ResponseApiHelper
import ResponseApiHelper from '../helpers/ResponseApiHelper'
import { TokenRequest } from '../middleware/auth.middleware'

// Import model
import User from '../models/user.model'

class UserService {
  public async getAll(req: Request, res: Response) {
    // DECLARE CONST CONTEXT
    const CONTEXT = 'user.service - getAll'
    try {
      /* A query to the database. */
      const _data = await User.find({})
      /* Returning the response to the client. */
      const response = ResponseApiHelper.setResponse(_data, CONTEXT, true, 200)
      return res.status(200).json(response)
    } catch (err) {
      /* Returning the response to the client. */
      const response = ResponseApiHelper.setResponse(err, CONTEXT, false, 500)
      return res.status(500).json(response)
    }
  }
  public async getSpecific(req: Request, res: Response) {
    // DECLARE CONST CONTEXT
    const CONTEXT = 'user.service - getSpecific'
    try {
      // Get params in the route
      const { id } = req.params
      /* A query to the database. */
      const _data = await User.findById(id)
      if (!_data) {
        throw Error(`User with ID: ${id} does not exists`)
      }
      /* Returning the response to the client. */
      const response = ResponseApiHelper.setResponse(_data, CONTEXT, true, 200)
      return res.status(200).json(response)
    } catch (err) {
      /* Returning the response to the client. */
      const response = ResponseApiHelper.setResponse(err, CONTEXT, false, 500)
      return res.status(500).json(response)
    }
  }

  public async getProfile(req: TokenRequest | Request | any, res: Response) {
    // DECLARE CONST CONTEXT
    const CONTEXT = 'user.service - getProfile'
    try {
      // Get the _id from token
      const id = req.token._id || null
      /* A query to the database. */
      const _data = await User.findById(id)
      if (!_data) {
        throw Error(`User with ID: ${id} does not exists`)
      }
      /* Returning the response to the client. */
      const response = ResponseApiHelper.setResponse(_data, CONTEXT, true, 200)
      return res.status(200).json(response)
    } catch (err) {
      /* Returning the response to the client. */
      const response = ResponseApiHelper.setResponse(err, CONTEXT, false, 500)
      return res.status(500).json(response)
    }
  }

  public async create(req: Request, res: Response) {
    // DECLARE CONST CONTEXT
    const CONTEXT = 'user.service - create'
    try {
      // Get all the params on the body
      const { firstName, lastName, email, avatar } = req.body
      /* A query to the database. */
      const _user = await User({
        firstName,
        lastName,
        email,
        avatar,
      })
      await _user.save()
      /* Returning the response to the client. */
      const response = ResponseApiHelper.setResponse(_user, CONTEXT, true, 200)
      return res.status(200).json(response)
    } catch (err) {
      /* Returning the response to the client. */
      const response = ResponseApiHelper.setResponse(err, CONTEXT, false, 500)
      return res.status(500).json(response)
    }
  }
}

export default new UserService()
