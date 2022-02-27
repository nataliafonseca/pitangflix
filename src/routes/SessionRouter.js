import { Router } from "express";

import SessionController from "../controllers/SessionController.js";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated.js";

const sessionController = new SessionController();

const router = Router();

router.get("/:id", sessionController.getOne.bind(sessionController));
router.get("/", sessionController.index.bind(sessionController));
router.post(
  "/",
  ensureAuthenticated,
  sessionController.store.bind(sessionController)
);
router.put(
  "/:id",
  ensureAuthenticated,
  sessionController.update.bind(sessionController)
);
router.delete(
  "/:id",
  ensureAuthenticated,
  sessionController.remove.bind(sessionController)
);

export default router;
