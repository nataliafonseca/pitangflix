import { Router } from "express";

import UserController from "../controllers/UserController.js";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated.js";

const userController = new UserController();

const router = Router();

router.get(
  "/:id",
  ensureAuthenticated,
  userController.getOne.bind(userController)
);
router.get("/", ensureAuthenticated, userController.index.bind(userController));
router.post("/", userController.store.bind(userController));
router.put(
  "/:id",
  ensureAuthenticated,
  userController.update.bind(userController)
);
router.delete(
  "/:id",
  ensureAuthenticated,
  userController.remove.bind(userController)
);
router.post("/login", userController.login.bind(userController));

export default router;
