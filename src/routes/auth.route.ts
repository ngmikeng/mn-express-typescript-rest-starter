import { Router } from "express";
import expressJwt from "express-jwt";
import config from "../config/config";
import { login, randomNumber } from "../controllers/auth.controller";
import authValidation from "../validation/auth.validation";
import { createValidator } from "express-joi-validation";
const validator = createValidator();
const router = Router();

/**
 * POST /api/v1/auth/login
 * - Returns token if correct username and password is provided
 */
/**
 * @swagger
 * /auth/login:
 *  post:
 *    tags: ["auth"]
 *    summary: Login
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: request payload
 *        description: Login payload.
 *        schema:
 *          type: object
 *          properties:
 *            username:
 *              type: string
 *            password:
 *              type: string
 *          example:
 *            username: "typescript"
 *            password: "typescript"
 *    responses:
 *      200:
 *        description: 'OK'
 *      401:
 *        description: 'Unauthorized'
 */
router.post("/login", validator.body(authValidation.login.body), login);

/**
 * GET /api/v1/auth/random-number
 * - Protected route, needs token returned by the above as header. Authorization: Bearer {token}
 */
/**
 * @swagger
 * /auth/randomNumber:
 *  get:
 *    tags: ["auth"]
 *    summary: Test protected route, get a random number
 *    security:
 *      - ApiKeyAuth: []
 *    consumes:
 *      - application/json
 *    responses:
 *      200:
 *        description: 'OK'
 *      401:
 *        description: 'Unauthorized'
 */
router.get("/randomNumber", expressJwt({ secret: config.jwtSecret }), randomNumber);

export default router;
