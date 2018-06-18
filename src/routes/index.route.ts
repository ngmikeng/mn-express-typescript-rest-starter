import { Router, Request, Response } from "express";
import authRoutes from "./auth.route";

const router = Router();

/** GET /health-check - Check service health */
router.get("/health-check", (req: Request, res: Response) => res.send("OK"));

// mount auth routes at /auth
router.use("/auth", authRoutes);

export default router;