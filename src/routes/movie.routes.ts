import Router from "express";

import movieFinder from "../controller.ts/movie.controller.js";

const router = Router();

router.get("/:title", movieFinder);

export default router;
