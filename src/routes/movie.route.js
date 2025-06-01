import { Router } from "express";
import { movies, random } from "../controller/movie.controller.js";

const router = Router();

router.route("/random").get(random);
router.route("/movies").get(movies);

export default router;
