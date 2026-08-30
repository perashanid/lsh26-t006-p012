// Database seeding script
import { seedDatabase, needsSeeding } from './src/lib/seed-database.ts';

async function main() {
  console.log('Checking if database needs seeding...');
  
  const needs = await needsSeeding();
  
  if (needs) {
    console.log('Seeding database with demo data...');
    await seedDatabase();
    console.log('✓ Database seeded successfully!');
  } else {
    console.log('Database already has data. Skipping seed.');
  }
}

main().catch((error) => {
  console.error('Seeding failed:', error);
  process.exit(1);
});
