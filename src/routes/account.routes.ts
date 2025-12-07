import { Router } from "express";
import { authMiddleware } from "../middlewares";
import { AccountController } from "../controllers/AccountController";

const router = Router();

router.post("/add", authMiddleware, AccountController.add);
router.put("/:id", authMiddleware, AccountController.update);
router.delete("/:id", authMiddleware, AccountController.delete);
router.get("/", authMiddleware, AccountController.getAccounts);
router.get("/:id_account", authMiddleware, AccountController.getAccountById);

export default router;
