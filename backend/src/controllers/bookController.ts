import { Request, Response, NextFunction } from "express";
import Book from "../models/book";
import { HTTP_STATUS } from "../constants/httpStatus";

export const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = await Book.create(req.body);
    res.status(HTTP_STATUS.CREATED).json(book);
  } catch (error) {
    next(error);
  }
};

export const getBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { genre, author, minYear, available, limit = 10, offset = 0 } = req.query;
    const filter: any = {};

    if (genre) filter.genre = genre;
    if (author) filter.author = author;
    if (minYear) filter.publishedYear = { $gte: Number(minYear) };
    if (available === "true") filter.stock = { $gt: 0 };

    const books = await Book.find(filter).skip(Number(offset)).limit(Number(limit));
    res.status(HTTP_STATUS.OK).json(books);
  } catch (error) {
    next(error);
  }
};

export const checkoutBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      const error: any = new Error("Book not found");
      error.statusCode = HTTP_STATUS.NOT_FOUND;
      return next(error);
    }

    if (book.stock <= 0) {
      const error: any = new Error("Out of stock");
      error.statusCode = HTTP_STATUS.BAD_REQUEST;
      return next(error);
    }

    book.stock -= 1;
    await book.save();
    res.status(HTTP_STATUS.OK).json(book);
  } catch (error) {
    next(error);
  }
};
