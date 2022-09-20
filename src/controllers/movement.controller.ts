/**
 * Controller for Movement with all the routes for the notes
 */
import { Router } from "express";
import MovementService from "../services/movement.service";

class MovementController {
  // Setting the router +
  public router: Router;

  // constructor with the router configuration
  constructor() {
    this.router = Router();
    this.routes();
  }
  // Method to set the routes
  public routes() {
    // GET /api/movements
    this.router.get("/", MovementService.getAll);
    /*
    // GET /api/notes/:id
    this.router.get("/:id", MovementService.getOne);

    // POST /api/notes
    this.router.post(
      "/",
      body("title").not().isEmpty().withMessage("Title is required"),
      body("content").not().isEmpty().withMessage("Content is required"),
      body("is_important").isBoolean().withMessage("Is important is required"),
      body("is_private").isBoolean().withMessage("Is private is required"),
      MovementService.create
    );

    // PUT /api/notes/:id
    this.router.put(
      "/:id",
      body("title").not().isEmpty().withMessage("Title is required"),
      body("content").not().isEmpty().withMessage("Content is required"),
      body("is_important").isBoolean().withMessage("Is important is required"),
      body("is_private").isBoolean().withMessage("Is private is required"),
      MovementService.update
    );

    // DELETE /api/notes/:id
    this.router.delete("/:id", MovementService.delete);
    */
  }
}

export default new MovementController().router;
