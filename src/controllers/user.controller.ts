/**
 * Controller for User with all the routes for the notes
 */
import { Router } from 'express'
import { auth } from '../middleware/auth.middleware'
import UserService from '../services/user.service'

class AccountController {
  // Setting the router +
  public router: Router

  // constructor with the router configuration
  constructor() {
    this.router = Router()
    this.routes()
  }
  // Method to set the routes
  public routes() {
    // GET /api/users/
    this.router.get('/', auth, UserService.getAll)
    // GET /api/users/profile
    this.router.get('/profile', auth, UserService.getProfile)
    // GET /api/users/:id
    this.router.get('/:id', auth, UserService.getSpecific)
    // POST /api/users/
    this.router.post('/', auth, UserService.create)
  }
}

export default new AccountController().router
