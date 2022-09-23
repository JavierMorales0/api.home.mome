/**
 * Controller for Auth with all the routes for the notes
 */
import { Router } from "express";
import AuthService from "../services/auth.service";

class AuthController {
  // Setting the router +
  public router: Router;

  // constructor with the router configuration
  constructor() {
    this.router = Router();
    this.routes();
  }
  // Method to set the routes
  public routes() {
    // POST /api/auth/login
    this.router.post("/login", AuthService.login);
  }
}

export default new AuthController().router;
