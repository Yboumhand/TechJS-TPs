import express from "express";
import {
  getBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
} from "../controllers/booksController.js";

const router = express.Router();

// Get all books
router.get("/", getBooks);

// Get a particular book
router.get("/:id", getBookById);

// Add a book
router.post("/", addBook);

// Update a book
router.put("/:id", updateBook);

// Delete a book
router.delete("/:id", deleteBook);

export default router;
