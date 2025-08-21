import { Router } from "express";
import * as RatingController from "../controllers/RatingController";

const router = Router();

router.get("/:contentId", RatingController.getRatingsByContent);
router.post("/", RatingController.addRating);

export default router;
