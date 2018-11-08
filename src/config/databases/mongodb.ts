import mongoose from "mongoose";
import { Promise } from "bluebird";
import util from "util";
import config from "../config";
import winstonLogger from "../winston";

if (config.env === "development") {
  mongoose.set("debug", false);
}
// Use bluebird Promise for mongoose
mongoose.Promise = Promise;
const connectionsByDb: any = {};

export function createConnection(options?: object) {
  return new Promise((resolve, reject) => {
    try {
      // create default connection
      mongoose.connect(config.mongodbUrl, options);
      mongoose.connection.on("error", function(error) {
        reject(error);
      });
      mongoose.connection.on("connected", function() {
        resolve(mongoose.connection);
      });
      mongoose.connection.on("disconnected", function() {
        winstonLogger.info("MongoDB disconnected");
      });
      mongoose.connection.on("reconnected", function() {
        winstonLogger.info("MongoDB reconnected!");
      });
      mongoose.connection.on("reconnecting", function() {
        winstonLogger.info("Reconnecting...!");
      });
    } catch (err) {
      reject(util.inspect(err));
    }
  });
}

export function useDb(dbName: string) {
  if (!connectionsByDb[dbName]) {
    connectionsByDb[dbName] = mongoose.connection.useDb(dbName);
  }

  return connectionsByDb[dbName];
}