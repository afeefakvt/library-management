import { body } from "express-validator";

export const registerValidation = [
  body("name")
    .notEmpty().withMessage("Name is required")
    .isLength({ min: 3, max: 30 }).withMessage("Name must be between 3 and 30 characters"),

  body("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Please provide a valid email"),

  body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
];

export const loginValidation = [
  body("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Please provide a valid email"),

  body("password")
    .notEmpty().withMessage("Password is required"),
];
