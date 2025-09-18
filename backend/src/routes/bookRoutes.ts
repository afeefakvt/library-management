import { Router } from "express";
import { createBook, getBooks, checkoutBook } from "../controllers/bookController";
import { authToken } from "../middlewares/authToken";
import { withValidation } from "../middlewares/validation";
import { checkoutBookValidation, createBookValidation } from "../validations/bookValidation";

const router = Router();

router.post("/", authToken,withValidation(createBookValidation), createBook);          
router.get("/",  getBooks);           
router.post("/:id/checkout", authToken, withValidation(checkoutBookValidation), checkoutBook); 

export default router;
