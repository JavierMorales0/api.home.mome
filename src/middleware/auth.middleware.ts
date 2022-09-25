import jwt, { Secret, decode } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
// Import response api ResponseApiHelper
import ResponseApiHelper from '../helpers/ResponseApiHelper'

export interface TokenRequest extends Request {
  token: any
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  // DECLARE CONST CONTEXT
  const CONTEXT = 'auth.middleware - auth'
  try {
    /* Getting the token from the header and removing the "Bearer " part. */
    const token = req.header('Authorization')?.replace('Bearer ', '')

    /* Throwing an error if the token is not present. */
    if (!token) {
      throw {
        message: 'You are not logged in. Please authenticate ',
      }
    }
    /* Getting the secret key from the environment variable. */
    const SECRET_KEY: Secret = process.env.JWT_SECRET_KEY ?? ''
    /* Verifying the token and returning the decoded token. */
    const decoded: any = jwt.verify(token, SECRET_KEY)
    if (new Date(decoded.exp * 1000) < new Date()) {
      throw Error('Expired token')
    }
    /* Casting the req object to the TokenRequest type. */
    ;(req as TokenRequest).token = decoded

    /* A function that is used to pass control to the next middleware function. */
    next()
  } catch (err) {
    /* Returning the response to the client. */
    const response = ResponseApiHelper.setResponse(err, CONTEXT, false, 500)
    return res.status(401).json(response)
  }
}
