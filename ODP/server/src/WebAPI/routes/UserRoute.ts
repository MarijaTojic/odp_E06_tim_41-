import { Router } from "express";
import * as UsersController from "../../WebAPI/controllers/UserController";

const router = Router();

router.get("/", UsersController.getAllUsers);
router.get("/:id", UsersController.getUserById);

export default router;
