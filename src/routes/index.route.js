import Router from "express";
const router = Router();
import patientRouter from "./patient.route.js";


router.use("/api/v1/auth", patientRouter);


export default router;