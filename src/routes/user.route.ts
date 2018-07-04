import { Router } from "express";
import Joi from "joi";
import * as userCtrl from "../controllers/user.controller";
import userValidation from "../validation/user.validation";
const validate = require("express-validation");

const router = Router();

/**
 * @swagger
 * /users:
 *  get:
 *    tags: ["user"]
 *    summary: Get list users
 *    security:
 *      - ApiKeyAuth: []
 *    consumes:
 *      - application/json
 *    responses:
 *      200:
 *        description: 'OK'
 *      401:
 *        description: 'Unauthorized'
 *  post:
 *    tags: ["user"]
 *    summary: Create an user
 *    security:
 *      - ApiKeyAuth: []
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: request payload
 *        description: User payload.
 *        schema:
 *          type: object
 *          properties:
 *            username:
 *              type: string
 *            email:
 *              type: string
 *            fullName:
 *              type: string
 *    responses:
 *      200:
 *        description: 'OK'
 *      401:
 *        description: 'Unauthorized'
 */
router.route("/")
  /** GET /api/v1/users - Get list of users */
  .get(userCtrl.list)
  /** POST /api/users - Create new user */
  .post(validate(userValidation.createUser), userCtrl.create);

/**
 * @swagger
 * /users/{userId}:
 *  get:
 *    tags: [user]
 *    summary: Get an user by user's id
 *    security:
 *      - ApiKeyAuth: []
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: userId
 *        type: string
 *        description: User's id.
 *    responses:
 *      200:
 *        description: 'OK'
 *      401:
 *        description: 'Unauthorized'
 */
router.route("/:userId")
  /** GET /api/v1/users/:userId - Get user */
  .get(validate(userValidation.getById), userCtrl.get);

/**
 * @swagger
 * /users/db:
 *  post:
 *    tags: ["user"]
 *    summary: Create an user in a database that is different with the default database and be specified by name
 *    security:
 *      - ApiKeyAuth: []
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: request payload
 *        description: User payload.
 *        schema:
 *          type: object
 *          properties:
 *            username:
 *              type: string
 *            email:
 *              type: string
 *            fullName:
 *              type: string
 *      - in: query
 *        name: db
 *        description: Database name
 *    responses:
 *      200:
 *        description: 'OK'
 *      401:
 *        description: 'Unauthorized'
 */
router.route("/db")
  /** POST /api/users/db - Create new user and save in a database has name equal req.query.db */
  .post(validate(userValidation.createUserByDb), userCtrl.createByDb);

/** Load user when API with userId route parameter is hit */
router.param("userId", (req, res, next, id) => {
  const result = Joi.validate(id, userValidation.getById.params.userId);
  if (result.error) {
    return next(result.error);
  }
  return userCtrl.load(req, res, next, id);
});

export default router;
