import { Request, Response } from 'express'
import { TokenRequest } from '../middleware/auth.middleware'
/* Importing the connection to the database. */
import MongoConn from '../database/mongo.conn'

// Import response api ResponseApiHelper
import ResponseApiHelper from '../helpers/ResponseApiHelper'

// Import model
import Movement from '../models/movement.model'

class MovementService {
  public async getAll(req: TokenRequest | Request | any, res: Response) {
    // DECLARE CONST CONTEXT
    const CONTEXT = 'movement.service - getAll'
    try {
      /* A query to the database. */
      const _data = await Movement.find({ owner: req.token._id })
      /* Returning the response to the client. */
      const response = ResponseApiHelper.setResponse(_data, CONTEXT, true, 200)
      return res.status(200).json(response)
    } catch (err) {
      /* Returning the response to the client. */
      const response = ResponseApiHelper.setResponse(err, CONTEXT, false, 500)
      return res.status(500).json(response)
    }
  }

  public async getSpecific(req: TokenRequest | Request | any, res: Response) {
    // DECLARE CONST CONTEXT
    const CONTEXT = 'movement.service - getAll'
    try {
      const { id } = req.params
      /* A query to the database. */
      const _data = await Movement.findOne({
        owner: req.token._id,
        _id: id,
      })
      /* Returning the response to the client. */
      const response = ResponseApiHelper.setResponse(_data, CONTEXT, true, 200)
      return res.status(200).json(response)
    } catch (err) {
      /* Returning the response to the client. */
      const response = ResponseApiHelper.setResponse(err, CONTEXT, false, 500)
      return res.status(500).json(response)
    }
  }

  public async create(req: TokenRequest | Request | any, res: Response) {
    // DECLARE CONST CONTEXT
    const CONTEXT = 'movement.service - getAll'
    try {
      const { amount, type, date, description } = req.body
      /* Creating a new movement and saving it to the database. */
      const _movement = Movement({
        owner: req.token._id,
        amount,
        type,
        date,
        description,
      })
      await _movement.save()
      /* Returning the response to the client. */
      const response = ResponseApiHelper.setResponse(
        _movement,
        CONTEXT,
        true,
        201
      )
      return res.status(201).json(response)
    } catch (err) {
      /* Returning the response to the client. */
      const response = ResponseApiHelper.setResponse(err, CONTEXT, false, 500)
      return res.status(500).json(response)
    }
  }

  public async delete(req: TokenRequest | Request | any, res: Response) {
    // DECLARE CONST CONTEXT
    const CONTEXT = 'movement.service - getAll'
    try {
      const { id } = req.params
      /* Deleting the movement from the database. */
      const _movement = await Movement.deleteOne({
        owner: req.token._id,
        _id: id,
      })
      /* Returning the response to the client. */
      const response = ResponseApiHelper.setResponse(
        { ..._movement, _id: id },
        CONTEXT,
        true,
        200
      )
      return res.status(200).json(response)
    } catch (err) {
      /* Returning the response to the client. */
      const response = ResponseApiHelper.setResponse(err, CONTEXT, false, 500)
      return res.status(500).json(response)
    }
  }
}

export default new MovementService()
