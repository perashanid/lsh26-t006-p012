// Database seeding utility
import { getDatabase, COLLECTIONS } from "./mongodb";
import { seedExpenses, seedPreviousExpenses, seedSalary, seedSavingsPockets } from "../data/seed";

export async function seedDatabase() {
  try {
    console.log("Starting database seed...");
    const db = await getDatabase();
    
    // Clear existing data
    await db.collection(COLLECTIONS.EXPENSES).deleteMany({});
    await db.collection(COLLECTIONS.SALARY).deleteMany({});
    await db.collection(COLLECTIONS.SAVINGS_POCKETS).deleteMany({});
    
    // Insert seed data
    await db.collection(COLLECTIONS.EXPENSES).insertMany([...seedExpenses, ...seedPreviousExpenses]);
    await db.collection(COLLECTIONS.SALARY).insertOne({ id: "current-salary", ...seedSalary });
    await db.collection(COLLECTIONS.SAVINGS_POCKETS).insertMany(seedSavingsPockets);
    
    console.log("Database seeded successfully!");
    console.log(`- Inserted ${seedExpenses.length + seedPreviousExpenses.length} expenses`);
    console.log(`- Set salary to ৳${seedSalary.monthlyAmount.toLocaleString()}`);
    console.log(`- Created ${seedSavingsPockets.length} savings pockets`);
    
    return true;
  } catch (error) {
    console.error("Failed to seed database:", error);
    throw error;
  }
}

// Check if database needs seeding (is empty)
export async function needsSeeding(): Promise<boolean> {
  try {
    const db = await getDatabase();
    const expenseCount = await db.collection(COLLECTIONS.EXPENSES).countDocuments();
    return expenseCount === 0;
  } catch (error) {
    console.error("Failed to check if seeding needed:", error);
    return true;
  }
}
