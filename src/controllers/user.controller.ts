/**
 * Controller for User with all the routes for the notes
 */
import { Router } from "express";
import UserService from "../services/user.service";

class AccountController {
  // Setting the router +
  public router: Router;

  // constructor with the router configuration
  constructor() {
    this.router = Router();
    this.routes();
  }
  // Method to set the routes
  public routes() {
    // GET /api/users/
    this.router.get("/", UserService.getAll);
    // GET /api/users/:id
    this.router.get("/:id", UserService.getSpecific);
    // POST /api/users/
    this.router.post("/", UserService.create);
  }
}

export default new AccountController().router;
