import mongoose from "mongoose";
import { Promise } from "bluebird";
import util from "util";
import config from "../config";

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
        console.log("MongoDB disconnected");
      });
      mongoose.connection.on("reconnected", function() {
        console.log("MongoDB reconnected!");
      });
      mongoose.connection.on("reconnecting", function() {
        console.log("Reconnecting...!");
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