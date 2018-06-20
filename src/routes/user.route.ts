import { Router } from "express";
import expressJwt from "express-jwt";
import config from "../config/config";
import * as userCtrl from "../controllers/user.controller";

const router = Router();

router.route("/")
  .all(expressJwt({ secret: config.jwtSecret }))
  /** GET /api/v1/users - Get list of users */
  .get(userCtrl.list)
  /** POST /api/users - Create new user */
  .post(userCtrl.create);

router.route("/db")
  /** POST /api/users/db - Create new user and save in a database has name equal req.query.db */
  .post(userCtrl.createByDb);

router.route("/:userId")
  /** GET /api/v1/users/:userId - Get user */
  .get(userCtrl.get);

/** Load user when API with userId route parameter is hit */
router.param("userId", userCtrl.load);

export default router;
