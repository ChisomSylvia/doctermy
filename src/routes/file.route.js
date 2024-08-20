import { Router } from "express";
const router = Router();
import FileController from "../controllers/file.controller.js";
import upload from "../configs/multer.config.js";


router.post("/", upload.single("image"), FileController.uploadFile);

export default router;