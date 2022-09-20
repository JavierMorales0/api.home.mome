/**
 * App file for the api
 * This is the Api Class
 */

import express from "express";

// Import the routes
import MovementController from "./controllers/movement.controller";
import AccountController from "./controllers/account.controller";
import UserController from "./controllers/user.controller";

import * as dotenv from "dotenv";

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
    dotenv.config();
  }

  private middlewares(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private routes(): void {
    this.app.use("/api/movements", MovementController);
    this.app.use("/api/accounts", AccountController);
    this.app.use("/api/users", UserController);
  }

  // port can be number or string
  public listen(port: number | string): void {
    this.app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  }
}

export default App;
