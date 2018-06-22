import express, { Request, Response, NextFunction } from "express";
import logger from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compress from "compression";
import methodOverride from "method-override";
import httpStatus from "http-status";
import cors from "cors";
import helmet from "helmet";

import APIError, { APIErrorType } from "../helpers/errorHandlers/APIError";
import { responseError } from "../helpers/responseHandlers/index";
import config from "./config";
import wintonLogger from "./winston";
import routers from "../routes/index.route";
import { createConnection as createMongoConnection } from "./databases/mongodb";

const app = express();

if (config.env === "development") {
  app.use(logger("dev"));
}

// parse body params and attach them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cookieParser());
app.use(compress());
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

if (config.isUseMongo) {
  createMongoConnection()
    .then(() => console.log("Created connection to mongodb successful"))
    .catch((err: Error) => wintonLogger.error("Can not connect to mongodb", { error: err }));
}

// config swagger api
require("./swagger")(app);

// mount all routes on the path "/api/v1"
app.use("/api/v1", routers);

// if error is not an instanceOf APIError, convert it.
app.use((err: APIErrorType, req: Request, res: Response, next: NextFunction) => {
  if (!(err instanceof APIError)) {
    const apiError = new APIError(err.message, err.status, err.isPublic);
    return next(apiError);
  }
  return next(err);
});

// catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  const err = new APIError("API not found", httpStatus.NOT_FOUND);
  return next(err);
});

// error handler, send stacktrace only during development
app.use((err: APIErrorType, req: Request, res: Response, next: NextFunction) => // eslint-disable-line no-unused-vars
  res.status(err.status).json(responseError(err))
);

export default app;
