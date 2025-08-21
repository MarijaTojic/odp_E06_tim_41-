import { Router } from "express";
import * as ContentController from "../../WebAPI/controllers/contentController";

const router = Router();

router.get("/", ContentController.getAllContent);
router.get("/:id", ContentController.getContentById);
router.post("/", ContentController.createContent);




export default router;
