import { Router } from 'express';
import { authMiddleware } from '../middlewares';
import { DepositoController } from '../controllers/DepositoController';

const router = Router();

router.post("/add", authMiddleware, DepositoController.add);
router.put("/:id", authMiddleware, DepositoController.update);
router.delete("/:id", authMiddleware, DepositoController.delete);
router.get("/", authMiddleware, DepositoController.getDepositos);

export default router;
