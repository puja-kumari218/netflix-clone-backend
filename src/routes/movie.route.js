import { Router } from "express";
import { random } from "../controller/movie.controller.js";


const router = Router();

router.route("/random").get(random);


export default router;
