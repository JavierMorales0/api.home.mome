import { Mongoose } from "mongoose";
import MongoConn from "../database/mongo.conn";

class MovementModel {
  private conn: any;
  private Schema: any;
  public Movement: any;

  constructor() {
    /* Creating a connection to the database. */
    this.conn = MongoConn.getConn();
    /* Creating a schema for the model. */
    this.Schema = this.conn.Schema({
      amount: {
        type: Number,
        required: true,
        default: 0.0,
      },
      type: {
        type: String,
        enum: ["in", "out", "unknown"],
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
    });
    /* Creating a model from the schema. */
    this.Movement = this.conn.model("Movement", this.Schema);
  }
}

export default new MovementModel().Movement;
