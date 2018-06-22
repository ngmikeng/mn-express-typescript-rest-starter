import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import { default as User, IUser } from "../models/user.model.js";
import APIError from "../helpers/errorHandlers/APIError";
import { responseSuccess } from "../helpers/responseHandlers/index";
import { useDb } from "../config/databases/mongodb";

/**
 * Load user and append to req.
 */
export function load(req: Request, res: Response, next: NextFunction, id: string) {
  User.getById(id)
    .then((user: IUser) => {
      req.user = user;
      return next();
    })
    .catch((e: Error) => next(e));
}

/**
 * Get user
 * @returns {User}
 */
export function get(req: Request, res: Response) {
  return res.json(req.user);
}

/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {User[]}
 */
export function list(req: Request, res: Response, next: NextFunction) {
  const { limit = 50, skip = 0 } = req.query;
  User.getList({ limit, skip })
    .then((users: Array<IUser>) => res.json(responseSuccess(users)))
    .catch((e: Error) => next(e));
}

/**
 * Create new user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
export function create(req: Request, res: Response, next: NextFunction) {
  const user = new User({
    username: req.body.username,
    fullName: req.body.fullName
  });

  user.save()
    .then(savedUser => {
      return res.json(responseSuccess(savedUser));
    })
    .catch((e: Error) => next(e));
}

export function createByDb(req: Request, res: Response, next: NextFunction) {
  const dbName = req.query.db;
  if (!dbName) {
    const err = new APIError("Invalid query param: db.", httpStatus.BAD_REQUEST, true);
    return next(err);
  } else {
    const connection = useDb(dbName);
    const UserByDb = connection.model("User", User.schema);
    const user = new UserByDb({
      username: req.body.username,
      fullName: req.body.fullName
    });

    user.save()
      .then((savedUser: IUser) => res.json(responseSuccess(savedUser)))
      .catch((e: Error) => next(e));
  }
}
