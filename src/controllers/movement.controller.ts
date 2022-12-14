/**
 * Controller for Movement with all the routes for the notes
 */
import { Router } from 'express'
import { auth } from '../middleware/auth.middleware'
import MovementService from '../services/movement.service'

class MovementController {
  // Setting the router +
  public router: Router

  // constructor with the router configuration
  constructor() {
    this.router = Router()
    this.routes()
  }
  // Method to set the routes
  public routes() {
    // GET /api/movements
    this.router.get('/', auth, MovementService.getAll)
    // GET /api/movements/:id
    this.router.get('/:id', auth, MovementService.getSpecific)
    // POST /api/movements
    this.router.post('/', auth, MovementService.create)
    // DELETE /api/movements
    this.router.delete('/:id', auth, MovementService.delete)
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

export default new MovementController().router
