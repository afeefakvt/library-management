import { Router } from "express";
import { createBook, getBooks, checkoutBook } from "../controllers/bookController";
import { authToken } from "../middlewares/authToken";

const router = Router();

router.post("/", authToken, createBook);          
router.get("/",  getBooks);           
router.post("/:id/checkout", authToken, checkoutBook); 

export default router;
