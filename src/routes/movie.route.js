import { Router } from "express";
import {
  deleteFavorite,
  getFavorite,
  getMovieDetails,
  insertFavorite,
  movies,
  random,
} from "../controller/movie.controller.js";

const router = Router();

router.route("/random").get(random);
router.route("/movies").get(movies);
router.route("/favorite").post(insertFavorite);
router.route("/favorite").delete(deleteFavorite);
router.route("/favorite/:email").get(getFavorite);

router.route("/:movieId").get(getMovieDetails);

export default router;
