import Router from "express";
const router = Router();
import userRouter from "./user.route.js";
import reviewRouter from "./review.route.js";


router.use("/api/v1/user", userRouter);
router.use("/api/v1/review", reviewRouter);


export default router;