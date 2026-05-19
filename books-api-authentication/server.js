import "dotenv/config.js";
import express from "express";
import session from "express-session";
import mongoose from "mongoose";

// Import routes
import authRoutes from "./routes/auth.js";
import booksRoutes from "./routes/books.js";

// Import middleware
import { checkAuth } from "./middleware/auth.js";

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 }, // 24 hours
  }),
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/books", checkAuth, booksRoutes);

// Default route
app.get("/", (req, res) => {
  if (req.session.user) {
    res.json({
      message: `Welcome ${req.session.user.username}!`,
      user: req.session.user,
    });
  } else {
    res.json({ message: "Welcome! Please register or login to access books." });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 Server running on http://localhost:${PORT}`);
  console.log("\n📝 Available endpoints:");
  console.log("   POST   /api/auth/register       - Register new user");
  console.log("   POST   /api/auth/login          - Login user");
  console.log("   POST   /api/auth/logout         - Logout user");
  console.log("   GET    /api/books               - Get all books (protected)");
  console.log(
    "   GET    /api/books/:id           - Get book by ID (protected)",
  );
  console.log("   POST   /api/books               - Add new book (protected)");
  console.log("   PUT    /api/books/:id           - Update book (protected)");
  console.log("   DELETE /api/books/:id           - Delete book (protected)\n");
});
