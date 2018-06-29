import { Router, Request, Response } from "express";
import expressJwt from "express-jwt";
import config from "../config/config";
import authRoutes from "./auth.route";
import userRoutes from "./user.route";

const router = Router();

/** GET /health-check - Check service health */
/**
 * @swagger
 * /health-check:
 *   get:
 *     description: Check service health
 *     responses:
 *       200:
 *         description: 'OK'
 */
router.get("/health-check", (req: Request, res: Response) => res.send("OK"));

// mount auth routes at /auth
router.use("/auth", authRoutes);

// mount auth routes at /auth
router.use("/users", expressJwt({ secret: config.jwtSecret }), userRoutes);

export default router;