import Router from "express";
const router = Router();
import authRouter from "./auth.route.js";
import userRouter from "./user.route.js";
import fileRouter from "./file.route.js";
import reviewRouter from "./review.route.js";
import appointmentRouter from "./appointment.route.js";
import appointmentTypeRouter from "./appointmentType.route.js";
// import notificationRouter from "./notification.route.js";
import transactionRouter from "./transaction.route.js";
import webhookRouter from "./webhook.route.js";


router.use("/api/v1/auth", authRouter);
router.use("/api/v1/users", userRouter);
router.use("/api/v1/file", fileRouter);
router.use("/api/v1/review", reviewRouter);
router.use("/api/v1/appointment", appointmentRouter);
router.use("/api/v1/appointment-type", appointmentTypeRouter);
// router.use("/api/v1/notification", notificationRouter);
router.use("/api/v1/transaction", transactionRouter);
router.use("/api/v1/webhook", webhookRouter);

export default router;