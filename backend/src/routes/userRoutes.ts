import { Router } from "express";
import { register, login } from "../controllers/userController";
import { withValidation } from "../middlewares/validation";
import { loginValidation, registerValidation } from "../validations/userValidations";

const router = Router();

router.post("/register",withValidation(registerValidation), register);
router.post("/login", withValidation(loginValidation), login);

export default router;
