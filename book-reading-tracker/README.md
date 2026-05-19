# 📚 Book Reading Tracker

A full-stack TypeScript application for tracking your reading progress. Built with Express backend, MongoDB database, and Tailwind CSS frontend.

## 🚀 Features

- ✅ **Add Books**: Register new books with detailed information
- 📊 **Track Progress**: Monitor reading progress with visual progress bars
- 📈 **Statistics**: View overall reading statistics (total books, pages read, percentage)
- ✏️ **Edit Books**: Update pages read and book status
- 🗑️ **Delete Books**: Remove books from your collection
- 🎨 **Beautiful UI**: Responsive design with Tailwind CSS
- 💾 **MongoDB Storage**: All books stored securely in MongoDB

## 📋 Project Structure

```
typescript_cc/
├── src/
│   ├── models/
│   │   └── Book.ts          # Book class module with methods
│   ├── db/
│   │   └── connection.ts    # MongoDB connection setup
│   ├── routes/
│   │   └── books.ts         # API routes for CRUD operations
│   └── server.ts            # Express server entry point
├── public/
│   └── index.html           # Frontend with Tailwind CSS
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── .env                     # Environment variables
└── README.md               # This file
```

## 📦 Dependencies

### Production

- **express**: Web framework
- **mongodb**: MongoDB driver
- **cors**: Cross-Origin Resource Sharing
- **dotenv**: Environment variable management

### Development

- **typescript**: TypeScript compiler
- **ts-node**: TypeScript execution for Node.js
- **@types/\***: TypeScript type definitions

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account and cluster
3. Get your connection string
4. Update `.env` file:
   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/booktracker?retryWrites=true&w=majority
   ```

### 3. Compile TypeScript

```bash
npm run build
```

### 4. Run Development Server

```bash
npm run dev
```

The server will start on `http://localhost:5000`

## 🎯 Book Properties

Each book has the following properties:

- **title** (string): Book title
- **author** (string): Author name
- **numberOfPages** (number): Total pages
- **status** (enum): Read, Re-read, DNF, Currently reading, Returned, Unread, Want to read
- **price** (number): Book price
- **pagesRead** (number): Pages already read (must be < numberOfPages)
- **format** (enum): Print, PDF, Ebook, AudioBook
- **suggestedBy** (string): Who suggested the book
- **finished** (0 | 1): Auto-set to 1 when pagesRead === numberOfPages

## 📚 Book Class Methods

### Constructor

```typescript
new Book(
  title,
  author,
  numberOfPages,
  status,
  price,
  pagesRead,
  format,
  suggestedBy,
);
```

### currentlyAt()

Returns current reading progress:

```typescript
{
  pagesRead: number,
  percentage: number,
  isFinished: boolean
}
```

### deleteBook()

Returns the MongoDB ObjectId for deletion

### updatePagesRead(newPagesRead)

Update pages read and automatically set finished flag

## 🔌 API Endpoints

### Get All Books

```
GET /api/books
```

### Get Statistics

```
GET /api/books/stats
```

### Create Book

```
POST /api/books
Content-Type: application/json

{
  "title": "Book Title",
  "author": "Author Name",
  "numberOfPages": 300,
  "status": "Currently reading",
  "price": 25.99,
  "pagesRead": 150,
  "format": "Print",
  "suggestedBy": "Friend Name"
}
```

### Update Book

```
PUT /api/books/{id}
Content-Type: application/json

{
  "pagesRead": 200,
  "status": "Read"
}
```

### Delete Book

```
DELETE /api/books/{id}
```

## 🎨 Frontend Features

- **Form Section**: Add new books with all details
- **Statistics Dashboard**: Real-time reading statistics
- **Books List**: Display all books with progress bars
- **Edit Modal**: Update pages read and status
- **Delete Functionality**: Remove books with confirmation
- **Responsive Design**: Works on desktop and mobile

## 🚦 Running the Application

1. **Development Mode**:

   ```bash
   npm run dev
   ```

2. **Production Build**:

   ```bash
   npm run build
   npm start
   ```

3. **Watch Mode** (auto-compile):
   ```bash
   npm run watch
   ```

## 📱 Usage

1. Open `http://localhost:5000` in your browser
2. Fill in the form to add a new book
3. View all books in the list below
4. Click "Edit" to update reading progress
5. Click "Delete" to remove a book
6. Check statistics for overall reading progress

## ✨ How It Works

### Frontend (HTML + Tailwind CSS)

- User fills out the form with book details
- JavaScript handles form submission via fetch API
- Books are fetched from backend and displayed with progress bars
- Real-time statistics update every 5 seconds

### Backend (Express + MongoDB)

- RESTful API handles CRUD operations
- Book class validates data and auto-calculates finished status
- MongoDB stores all books persistently
- Error handling and validation on all endpoints

### Database (MongoDB)

- Cloud-based MongoDB Atlas for reliability
- Automatic connection handling and retry logic
- Collection created automatically on first connection

## 🔧 Troubleshooting

### MongoDB Connection Error

- Verify MONGO_URI in .env file
- Ensure MongoDB Atlas cluster is running
- Check network access settings in MongoDB Atlas

### Port Already in Use

- Change PORT in .env file
- Or kill the process using port 5000

### TypeScript Compilation Error

- Run `npm install` to ensure all dependencies installed
- Check tsconfig.json for proper settings

## 📖 Learn More

- [Express.js Docs](https://expressjs.com/)
- [MongoDB Docs](https://docs.mongodb.com/)
- [TypeScript Docs](https://www.typescriptlang.org/)
- [Tailwind CSS Docs](https://tailwindcss.com/)

## 🎓 Enjoy Your Reading Tracker! 📚

Happy reading and tracking! 🚀
