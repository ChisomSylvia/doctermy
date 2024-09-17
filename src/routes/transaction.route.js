import { Router } from "express";
const router = Router();
import { initializePaystackPaymentCtrl } from "../controllers/transaction.controller.js";
import { authenticate } from "../middlewares/authenticate.middleware.js";
import { USER_TYPES } from "../utils/user.js";

router.post(
  "/paystack/initialize",
  authenticate([USER_TYPES.PATIENT]),
  initializePaystackPaymentCtrl
);

export default router;