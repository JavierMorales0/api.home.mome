/**
 * Set the database configuration to use in the application
 * PostgreSQL is the default database
 */
import * as dotenv from "dotenv";
dotenv.config();
export const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;
