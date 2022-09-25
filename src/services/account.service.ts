import { Request, Response } from 'express'
/* Importing the connection to the database. */
import MongoConn from '../database/mongo.conn'

// Import response api ResponseApiHelper
import ResponseApiHelper from '../helpers/ResponseApiHelper'

// Import model
import Account from '../models/account.model'

class AccountService {
  public async getSpecific(req: Request, res: Response) {
    // DECLARE CONST CONTEXT
    const CONTEXT = 'account.service - getSpecific'
    try {
      // Get params in the route
      const { id } = req.params
      /* A query to the database. */
      const _data = await Account.findById(id)
      if (!_data) {
        throw Error(`Account with ID: ${id} does not exists`)
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
}

export default new AccountService()
