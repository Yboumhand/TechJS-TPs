import { Router } from "express";
import type { Request, Response } from "express";
import { ObjectId } from "mongodb";
import type { IBook, BookStatus, BookFormat } from "../models/Book.js";
import { Book } from "../models/Book.js";
import { getBooksCollection } from "../db/connection.js";

const router = Router();

/**
 * GET /api/books - Get all books
 */
router.get("/books", async (req: Request, res: Response) => {
  try {
    const collection = getBooksCollection();
    const books = await collection.find({}).toArray();
    res.json({
      success: true,
      data: books,
      count: books.length,
    });
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch books",
    });
  }
});

/**
 * GET /api/books/stats - Get reading statistics
 */
router.get("/books/stats", async (req: Request, res: Response) => {
  try {
    const collection = getBooksCollection();
    const books = await collection.find({}).toArray();

    const stats = {
      totalBooks: books.length,
      totalBooksRead: books.filter((b) => b.finished === 1).length,
      totalPages: books.reduce((sum, b) => sum + b.numberOfPages, 0),
      totalPagesRead: books.reduce((sum, b) => sum + b.pagesRead, 0),
      overallPercentage: 0,
      byStatus: {} as Record<BookStatus, number>,
    };

    if (stats.totalPages > 0) {
      stats.overallPercentage =
        Math.round((stats.totalPagesRead / stats.totalPages) * 10000) / 100;
    }

    // Count books by status
    books.forEach((book) => {
      stats.byStatus[book.status] = (stats.byStatus[book.status] || 0) + 1;
    });

    res.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch statistics",
    });
  }
});

/**
 * POST /api/books - Create a new book
 */
router.post("/books", async (req: Request, res: Response) => {
  try {
    const {
      title,
      author,
      numberOfPages,
      status,
      price,
      pagesRead,
      format,
      suggestedBy,
    } = req.body;

    // Validation
    if (!title || !author || !numberOfPages || !status || !format) {
      res.status(400).json({
        success: false,
        error: "Missing required fields",
      });
      return;
    }

    // Create Book instance
    const book = new Book(
      title,
      author,
      numberOfPages,
      status as BookStatus,
      price || 0,
      pagesRead || 0,
      format as BookFormat,
      suggestedBy || "Unknown",
    );

    // Insert into database
    const collection = getBooksCollection();
    const result = await collection.insertOne(book.toJSON());

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: {
        _id: result.insertedId,
        ...book.toJSON(),
      },
    });
  } catch (error) {
    console.error("Error creating book:", error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to create book",
    });
  }
});

/**
 * PUT /api/books/:id - Update a book
 */
router.put("/books/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id?: string };
    const { pagesRead, status } = req.body;

    if (!id || !ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        error: "Invalid book ID",
      });
      return;
    }

    const collection = getBooksCollection();
    const objectId = new ObjectId(id);

    // Get the current book
    const currentBook = await collection.findOne({ _id: objectId });
    if (!currentBook) {
      res.status(404).json({
        success: false,
        error: "Book not found",
      });
      return;
    }

    // Calculate finished status
    let finished: 0 | 1 = currentBook.finished;
    if (pagesRead !== undefined) {
      finished = pagesRead === currentBook.numberOfPages ? 1 : 0;
    }

    // Update book
    const updateData: Partial<IBook> = {
      updatedAt: new Date(),
    };

    if (pagesRead !== undefined) {
      updateData.pagesRead = pagesRead;
      updateData.finished = finished;
    }
    if (status !== undefined) {
      updateData.status = status;
    }

    const result = await collection.findOneAndUpdate(
      { _id: objectId },
      { $set: updateData },
      { returnDocument: "after" },
    );

    if (!result) {
      res.status(404).json({
        success: false,
        error: "Book not found",
      });
      return;
    }

    res.json({
      success: true,
      message: "Book updated successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).json({
      success: false,
      error: "Failed to update book",
    });
  }
});

/**
 * DELETE /api/books/:id - Delete a book
 */
router.delete("/books/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id?: string };

    if (!id || !ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        error: "Invalid book ID",
      });
      return;
    }

    const collection = getBooksCollection();
    const objectId = new ObjectId(id);

    const result = await collection.deleteOne({ _id: objectId });

    if (result.deletedCount === 0) {
      res.status(404).json({
        success: false,
        error: "Book not found",
      });
      return;
    }

    res.json({
      success: true,
      message: "Book deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({
      success: false,
      error: "Failed to delete book",
    });
  }
});

export default router;
