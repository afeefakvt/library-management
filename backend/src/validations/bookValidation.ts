import { body, param } from "express-validator";

export const createBookValidation = [
  body("title")
    .notEmpty().withMessage("Title is required"),

  body("author")
    .notEmpty().withMessage("Author is required"),

  body("publishedYear")
    .optional()
    .isInt({ min: 1000, max: new Date().getFullYear() })
    .withMessage("Published year must be a valid year"),

  body("genre")
    .optional()
    .isString().withMessage("Genre must be a string"),

  body("stock")
    .notEmpty().withMessage("Stock is required")
    .isInt({ min: 0 }).withMessage("Stock must be a non-negative number"),
];

export const checkoutBookValidation = [
  param("id").isMongoId().withMessage("Invalid book ID"),
];
