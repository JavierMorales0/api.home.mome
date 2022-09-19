import { MONGO_CONNECTION_STRING } from "./config";
import mongoose from "mongoose";

class MongoConn {
  private conn: any = mongoose;

  constructor() {
    this.connect();
  }

  /**
   * This function connects to the MongoDB database using the Mongoose library
   * @returns Nothing.
   */
  public async connect() {
    try {
      await this.conn.connect(MONGO_CONNECTION_STRING, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      });
    } catch (err) {
      console.error(err);
    }
    return;
  }

  /**
   * "This function returns the connection status of the socket."
   * </code>
   * @returns The connection status of the socket.
   */
  public getConnStatus() {
    return this.conn.connection.readyState;
  }

  /**
   * It returns the connection object.
   * @returns The connection object.
   */
  public getConn() {
    return this.conn;
  }
}

/* Exporting the instance of the class. */
export default new MongoConn();
