// MongoDB connection singleton
import { MongoClient, Db } from "mongodb";
import dns from "node:dns";

// Ensure SRV records can be resolved in Node.js on Windows/local networks
if (typeof dns?.setServers === "function") {
  dns.setServers(["8.8.8.8", "1.1.1.1", "8.8.4.4"]);
}

const MONGODB_URI = "mongodb+srv://shanidsajjatuz:RnHu2S9L9xu93Hn0@cluster0.usmr4rf.mongodb.net/?retryWrites=true&w=majority";
const DB_NAME = "personal-ledger";

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase(): Promise<{ client: MongoClient; db: Db }> {
  // Return cached connection if available
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  try {
    // Create new connection
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    
    const db = client.db(DB_NAME);
    
    // Cache for reuse
    cachedClient = client;
    cachedDb = db;
    
    console.log("Connected to MongoDB");
    return { client, db };
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw new Error("Database connection failed");
  }
}

export async function getDatabase(): Promise<Db> {
  const { db } = await connectToDatabase();
  return db;
}

// Collection names
export const COLLECTIONS = {
  EXPENSES: "expenses",
  SALARY: "salary_settings",
  SAVINGS_POCKETS: "savings_pockets",
} as const;
