import { Router } from "express";

import MovieController from "../controllers/MovieController.js";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated.js";

const movieController = new MovieController();

const router = Router();

router.get("/:id", movieController.getOne.bind(movieController));
router.get("/", movieController.index.bind(movieController));
router.post(
  "/",
  ensureAuthenticated,
  movieController.store.bind(movieController)
);
router.put(
  "/:id",
  ensureAuthenticated,
  movieController.update.bind(movieController)
);
router.delete(
  "/:id",
  ensureAuthenticated,
  movieController.remove.bind(movieController)
);

export default router;
