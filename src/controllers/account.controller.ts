/**
 * Controller for Account with all the routes for the notes
 */
import { Router } from "express";
import { auth } from "../middleware/auth.middleware";
import AcountService from "../services/account.service";

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
    // GET /api/account/:id
    this.router.get("/:id", auth, AcountService.getSpecific);
  }
}

export default new AccountController().router;
