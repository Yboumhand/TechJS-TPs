# Express.js Books API with Authentication

## 📚 Description

This exercise demonstrates building a **RESTful API** using Express.js with user authentication and authorization. The project implements a complete authentication system with user registration, login, and session management to protect book CRUD operations.

### Key Learning Outcomes:

- Building RESTful APIs with Express.js
- User authentication with bcryptjs password hashing
- Session management with express-session
- MongoDB integration with Mongoose
- MVC (Model-View-Controller) architecture
- Environment variables for security
- Middleware implementation

## 🛠️ Technologies Used

| Technology                   | Purpose                               |
| ---------------------------- | ------------------------------------- |
| **Express.js 5.2.1**         | Web framework for Node.js             |
| **MongoDB + Mongoose 9.6.2** | NoSQL database                        |
| **bcryptjs 3.0.3**           | Password hashing & security           |
| **express-session 1.19.0**   | Session management                    |
| **dotenv 16.3.1**            | Environment variable management       |
| **Node.js (ES Modules)**     | JavaScript runtime with modern syntax |

## 📁 Project Structure

```
express-exo/
├── controllers/
│   ├── authController.js       # Register, login, logout logic
│   └── booksController.js      # Book CRUD operations
├── models/
│   └── User.js                 # User schema & password methods
├── routes/
│   ├── auth.js                 # Authentication endpoints
│   └── books.js                # Book endpoints
├── middleware/
│   └── auth.js                 # Authentication middleware
├── server.js                   # Main server setup
├── .env                        # Environment variables (NOT tracked)
├── .env.example                # Template for .env
└── package.json                # Dependencies & project metadata
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB connection string
- npm or yarn

### Installation

1. **Navigate to the project:**

   ```bash
   cd express-exo
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment variables:**

   ```bash
   # Copy the template
   cp .env.example .env

   # Edit .env with your MongoDB URI and settings
   ```

   Example `.env`:

   ```
   PORT=3000
   NODE_ENV=development
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
   SESSION_SECRET=your-secret-key
   ```

4. **Start the server:**

   ```bash
   npm start
   ```

   You should see:

   ```
   ✅ MongoDB connected successfully
   🚀 Server running on http://localhost:3000
   ```

## 📡 API Endpoints

### Authentication Endpoints

| Method | Endpoint             | Description       | Body                     |
| ------ | -------------------- | ----------------- | ------------------------ |
| POST   | `/api/auth/register` | Register new user | `{ username, password }` |
| POST   | `/api/auth/login`    | Login user        | `{ username, password }` |
| POST   | `/api/auth/logout`   | Logout user       | -                        |

### Book Endpoints (🔒 Protected - Requires Authentication)

| Method | Endpoint         | Description     | Body                |
| ------ | ---------------- | --------------- | ------------------- |
| GET    | `/api/books`     | Get all books   | -                   |
| GET    | `/api/books/:id` | Get book by ID  | -                   |
| POST   | `/api/books`     | Create new book | `{ title, author }` |
| PUT    | `/api/books/:id` | Update book     | `{ title, author }` |
| DELETE | `/api/books/:id` | Delete book     | -                   |

## 🧪 Testing the API

### 1. Register a User

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username": "john", "password": "securepass"}'
```

### 2. Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "john", "password": "securepass"}'
```

### 3. Get All Books (After Login)

```bash
curl -X GET http://localhost:3000/api/books \
  -H "Cookie: connect.sid=YOUR_SESSION_ID"
```

## 🏗️ Architecture

### MVC Pattern Implementation

- **Models**: Database schemas (User.js) - defines data structure
- **Controllers**: Business logic (authController.js, booksController.js) - handles requests
- **Routes**: API endpoints (routes/auth.js, routes/books.js) - defines routes
- **Middleware**: Cross-cutting concerns (middleware/auth.js) - authentication check

### Authentication Flow

1. User registers with username/password
2. Password is hashed with bcryptjs (10 salt rounds)
3. User logs in with credentials
4. Session is created with user info
5. Session cookie sent to client
6. Protected routes check for valid session
7. Books operations only available to authenticated users

## 🔐 Security Features

- ✅ Password hashing with bcryptjs
- ✅ Session-based authentication
- ✅ Protected routes with middleware
- ✅ Sensitive data in `.env` (not in git)
- ✅ Input validation
- ✅ Error handling

## 📚 What You'll Learn

- How to structure a Node.js/Express application professionally
- Authentication and authorization patterns
- RESTful API design principles
- MongoDB and Mongoose usage
- Session management
- Security best practices
- ES Modules in Node.js

## 🐛 Troubleshooting

**MongoDB Connection Error?**

- Check your MONGODB_URI in `.env`
- Ensure MongoDB cluster is running
- Verify IP whitelist in MongoDB Atlas

**Session Not Persisting?**

- Ensure cookies are enabled in browser
- Check SESSION_SECRET is set in `.env`

## 📝 Notes

- Book data is stored in-memory (not persisted to DB)
- Session data is server-side only
- All passwords are hashed before storage
- Each user can only see their own session

## 🎯 Next Steps

- Add book data persistence to MongoDB
- Implement role-based access control (admin/user)
- Add input validation middleware
- Add API documentation with Swagger
- Implement refresh tokens for JWT

---

**Created:** May 2026 | **Framework:** Express.js | **Database:** MongoDB

### Authentication

- `POST /register` - Register new user
- `POST /login` - Login user
- `POST /logout` - Logout user

### Books (Protected Routes)

- `GET /books` - Get all books
- `GET /books/:id` - Get book by ID
- `POST /books` - Add new book
- `PUT /books/:id` - Update book
- `DELETE /books/:id` - Delete book

## Example Requests

### Register

```json
POST /register
{
  "username": "john",
  "password": "pass123"
}
```

### Login

```json
POST /login
{
  "username": "john",
  "password": "pass123"
}
```

### Add Book

```json
POST /books
{
  "title": "Book Title",
  "author": "Author Name"
}
```

## Technologies Used

- Express.js
- MongoDB with Mongoose
- bcryptjs (password hashing)
- express-session (session management)

## Database Schema

### User Collection

```javascript
{
  username: String (unique, required),
  password: String (hashed, required),
  createdAt: Date
}
```

### Books (In-memory storage)

```javascript
{
  id: Number,
  title: String,
  author: String
}
```
