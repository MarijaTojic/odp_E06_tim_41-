import { Router } from "express";
import * as TriviaController from "../../WebAPI/controllers/triviaController";

const router = Router();

router.get("/:contentId", TriviaController.getTriviaByContent);
router.post("/", TriviaController.addTrivia);

export default router;
