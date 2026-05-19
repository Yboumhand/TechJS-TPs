import { MongoClient, Db, Collection } from "mongodb";
import type { IBook } from "../models/Book.js";

let client: MongoClient | null = null;
let db: Db | null = null;

const DB_NAME = "booktracker";
const COLLECTION_NAME = "books";

/**
 * Connect to MongoDB
 */
export async function connectDB(): Promise<Db> {
  if (db) {
    return db;
  }

  const MONGO_URI = process.env.MONGO_URI;

  if (!MONGO_URI) {
    throw new Error(
      "MONGO_URI environment variable is not set. Please check your .env file.",
    );
  }

  try {
    console.log("🔄 Connecting to MongoDB Atlas...");
    client = new MongoClient(MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
    });
    await client.connect();

    // Verify connection
    await client.db("admin").command({ ping: 1 });

    db = client.db(DB_NAME);

    // Create collection if it doesn't exist
    const collections = await db
      .listCollections({ name: COLLECTION_NAME })
      .toArray();
    if (collections.length === 0) {
      await db.createCollection(COLLECTION_NAME);
      console.log(`📚 Created collection: ${COLLECTION_NAME}`);
    }

    console.log("✅ Connected to MongoDB Atlas successfully!");
    return db;
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:");
    if (error instanceof Error) {
      console.error("   Error:", error.message);
      if (error.message.includes("ENOTFOUND")) {
        console.error("   ➜ Network issue: Check your internet connection");
      } else if (error.message.includes("authentication failed")) {
        console.error(
          "   ➜ Authentication error: Check username/password in connection string",
        );
      } else if (error.message.includes("IP")) {
        console.error(
          "   ➜ IP whitelist issue: Add your IP to MongoDB Atlas network access",
        );
      }
    }
    throw error;
  }
}

/**
 * Get the books collection
 */
export function getBooksCollection(): Collection<IBook> {
  if (!db) {
    throw new Error("Database not connected. Call connectDB() first.");
  }
  return db.collection<IBook>(COLLECTION_NAME);
}

/**
 * Disconnect from MongoDB
 */
export async function disconnectDB(): Promise<void> {
  if (client) {
    await client.close();
    client = null;
    db = null;
    console.log("✅ Disconnected from MongoDB");
  }
}

/**
 * Get database instance
 */
export function getDB(): Db {
  if (!db) {
    throw new Error("Database not connected. Call connectDB() first.");
  }
  return db;
}
