import { ObjectId } from "mongodb";

export type BookStatus =
  | "Read"
  | "Re-read"
  | "DNF"
  | "Currently reading"
  | "Returned"
  | "Unread"
  | "Want to read";
export type BookFormat = "Print" | "PDF" | "Ebook" | "AudioBook";

export interface IBook {
  _id?: ObjectId | undefined;
  title: string;
  author: string;
  numberOfPages: number;
  status: BookStatus;
  price: number;
  pagesRead: number;
  format: BookFormat;
  suggestedBy: string;
  finished: 0 | 1;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
}

export class Book {
  private title: string;
  private author: string;
  private numberOfPages: number;
  private status: BookStatus;
  private price: number;
  private pagesRead: number;
  private format: BookFormat;
  private suggestedBy: string;
  private finished: 0 | 1;
  private _id?: ObjectId | undefined;

  /**
   * Constructor for Book class
   * @param title - Book title
   * @param author - Book author
   * @param numberOfPages - Total pages in the book
   * @param status - Reading status
   * @param price - Book price
   * @param pagesRead - Number of pages already read
   * @param format - Book format (Print, PDF, Ebook, AudioBook)
   * @param suggestedBy - Who suggested the book
   * @param _id - MongoDB document ID (optional)
   */
  constructor(
    title: string,
    author: string,
    numberOfPages: number,
    status: BookStatus,
    price: number,
    pagesRead: number,
    format: BookFormat,
    suggestedBy: string,
    _id?: ObjectId,
  ) {
    if (pagesRead > numberOfPages) {
      throw new Error("Pages read cannot exceed total number of pages");
    }

    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.status = status;
    this.price = price;
    this.pagesRead = pagesRead;
    this.format = format;
    this.suggestedBy = suggestedBy;
    this.finished = pagesRead === numberOfPages ? 1 : 0;
    this._id = _id;
  }

  /**
   * Get current reading position/percentage
   * @returns Object with current pages and percentage
   */
  currentlyAt(): {
    pagesRead: number;
    percentage: number;
    isFinished: boolean;
  } {
    const percentage = (this.pagesRead / this.numberOfPages) * 100;
    return {
      pagesRead: this.pagesRead,
      percentage: Math.round(percentage * 100) / 100, // Round to 2 decimals
      isFinished: this.finished === 1,
    };
  }

  /**
   * Delete/remove this book (returns the ID for database deletion)
   * @returns MongoDB ObjectId for removal
   */
  deleteBook(): ObjectId | undefined {
    if (!this._id) {
      throw new Error("Cannot delete book without an ID");
    }
    return this._id;
  }

  /**
   * Update pages read and automatically set finished flag
   * @param newPagesRead - New number of pages read
   */
  updatePagesRead(newPagesRead: number): void {
    if (newPagesRead > this.numberOfPages) {
      throw new Error("Pages read cannot exceed total number of pages");
    }
    this.pagesRead = newPagesRead;
    this.finished = newPagesRead === this.numberOfPages ? 1 : 0;
  }

  /**
   * Convert Book instance to object for database storage
   */
  toJSON(): IBook {
    const bookData: IBook = {
      title: this.title,
      author: this.author,
      numberOfPages: this.numberOfPages,
      status: this.status,
      price: this.price,
      pagesRead: this.pagesRead,
      format: this.format,
      suggestedBy: this.suggestedBy,
      finished: this.finished,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    if (this._id !== undefined) {
      bookData._id = this._id;
    }

    return bookData;
  }

  // Getters
  getTitle(): string {
    return this.title;
  }

  getAuthor(): string {
    return this.author;
  }

  getNumberOfPages(): number {
    return this.numberOfPages;
  }

  getStatus(): BookStatus {
    return this.status;
  }

  getPrice(): number {
    return this.price;
  }

  getPagesRead(): number {
    return this.pagesRead;
  }

  getFormat(): BookFormat {
    return this.format;
  }

  getSuggestedBy(): string {
    return this.suggestedBy;
  }

  isFinished(): boolean {
    return this.finished === 1;
  }

  getId(): ObjectId | undefined {
    return this._id;
  }
}
