import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import httpStatus from "http-status";
import APIError from "../helpers/errorHandlers/APIError";
import { responseSuccess } from "../helpers/responseHandlers/index";
import config from "../config/config";

// sample user, used for authentication
const MOCK_USER = {
  username: "typescript",
  password: "typescript"
};

/**
 * Returns jwt token if valid username and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
export function login(req: Request, res: Response, next: NextFunction) {
  // Ideally you'll fetch this from the db
  // Idea here was to show how jwt works with simplicity
  if (req.body.username === MOCK_USER.username && req.body.password === MOCK_USER.password) {
    const token = jwt.sign({ username: MOCK_USER.username }, config.jwtSecret, { expiresIn: "2h" });

    return res.json(responseSuccess({ token: token, username: MOCK_USER.username }));
  }

  return next(new APIError("Authentication error", httpStatus.UNAUTHORIZED, true));
}

/**
 * This is a protected route. Will return random number only if jwt token is provided in header.
 * @param req
 * @param res
 * @returns {*}
 */
export function randomNumber(req: Request, res: Response) {
  // req.user is assigned by jwt middleware if valid token is provided
  return res.json(responseSuccess({
    user: req.user,
    num: Math.random() * 100
  }));
}