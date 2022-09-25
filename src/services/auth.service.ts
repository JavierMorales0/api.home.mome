import { Request, Response } from 'express'
import { sign } from 'jsonwebtoken'
import moment from 'moment'
import { OAuth2Client } from 'google-auth-library'
/* Importing the connection to the database. */
import MongoConn from '../database/mongo.conn'

// Import response api ResponseApiHelper
import ResponseApiHelper from '../helpers/ResponseApiHelper'

// Import model
import User from '../models/user.model'

class AuthService {
  public async login(req: Request, res: Response) {
    // DECLARE CONST CONTEXT
    const CONTEXT = 'auth.controller - login'

    /* Getting the client id from the environment variables. */
    const CLIENT_ID = process.env.GOOGLE_CLIENT_ID
    /* Getting the secret key and expiration time from the environment variables. */
    const SECRET_KEY: string = process.env.JWT_SECRET_KEY ?? ''
    const EXPIRATION_TIME: string = process.env.JWT_EXPIRATION_TIME ?? ''

    /* Creating a new instance of the OAuth2Client class. */
    const client = new OAuth2Client(CLIENT_ID)

    /* Destructuring the tokenId from the request body. */
    const { tokenId } = req.body
    let ticket: any = null
    try {
      /* Verifying the tokenId from the request body. */
      ticket = await client.verifyIdToken({
        idToken: tokenId,
        requiredAudience: CLIENT_ID,
      })
    } catch (err) {
      /* Returning the response to the client if the token is not valid */
      const response = ResponseApiHelper.setResponse(
        { message: 'Not valid token' },
        CONTEXT,
        false,
        401
      )
      return res.status(401).json(response)
    }
    /* Destructuring the email, email_verified, given_name, family_name, and
picture from the ticket.getPayload() method. */
    const { email, email_verified, given_name, family_name, picture, exp } =
      ticket.getPayload()

    /* This is checking if the email is verified. */
    if (!email_verified) {
      throw Error('Incorrect token from Google Authentication')
    }

    try {
      let _match = await User.findOne({ email })
      if (!_match) {
        /* This is creating a new user and saving it to the database. */
        const _user = User({
          firstName: given_name,
          lastName: family_name,
          email,
          avatar: picture,
        })
        await _user.save()
        /* Assigning the value of _user to _match. */
        _match = _user
      }
      /* Getting the expiration time from the token and adding it to the current
      time. */
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
      )
      const response = ResponseApiHelper.setResponse(
        {
          email: _match.email,
          token,
        },
        CONTEXT,
        true,
        200
      )
      return res.status(200).json(response)
    } catch (err: any) {
      /* Returning the response to the client. */
      const response = ResponseApiHelper.setResponse(err, CONTEXT, false, 500)
      return res.status(500).json(response)
    }
  }
}

export default new AuthService()
