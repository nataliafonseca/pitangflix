import { Router } from "express";

import MovieRouter from "./MovieRouter.js";
import UserRouter from "./UserRouter.js";
import SessionRouter from "./SessionRouter.js";

const router = Router();

router.use("/movie", MovieRouter);
router.use("/user", UserRouter);
router.use("/session", SessionRouter);

export default router;
