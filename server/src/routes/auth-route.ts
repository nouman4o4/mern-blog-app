import { Router } from "express";
import { register } from "../controllers/auth-controller";

const router = Router();

// router.route("/register").post(register);
router.post("/register", register);

export default router;
