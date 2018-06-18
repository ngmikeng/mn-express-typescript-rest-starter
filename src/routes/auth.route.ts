import { Router } from "express";
import expressJwt from "express-jwt";
import config from "../config/config";
import { login, randomNumber } from "../controllers/auth.controller";

const router = Router();

/**
 * POST /api/v1/auth/login
 * - Returns token if correct username and password is provided
 */
router.post("/login", login);

/**
 * GET /api/v1/auth/random-number
 * - Protected route, needs token returned by the above as header. Authorization: Bearer {token}
 */
router.get("/random-number", expressJwt({ secret: config.jwtSecret }), randomNumber);

export default router;