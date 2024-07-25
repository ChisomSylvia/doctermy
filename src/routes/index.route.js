import Router from "express";
const router = Router();
import patientRouter from "./patient.route.js";
import reviewRouter from "./review.route.js";


router.use("/api/v1/auth", patientRouter);
router.use("/api/v1/review", reviewRouter);


export default router;