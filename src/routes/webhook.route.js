import { Router } from "express";
const router = Router();
import { verifyPayment } from "../controllers/transaction.controller.js";
// import { USER_TYPES } from "../utils/user.js";

router.post("/paystack", verifyPayment);

export default router;
