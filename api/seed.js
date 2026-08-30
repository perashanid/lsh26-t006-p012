import { connectToDatabase } from './_db.js';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { db } = await connectToDatabase();

    // Check if already seeded
    const expenseCount = await db.collection('expenses').countDocuments();
    if (expenseCount > 0) {
      return res.status(200).json({ message: 'Database already seeded', seeded: false });
    }

    // Sample salary data
    const salary = {
      monthlyAmount: 50000,
      effectiveFrom: '2026-04-01T00:00:00.000Z',
      updatedAt: '2026-04-01T00:00:00.000Z'
    };

    // Sample expenses for current month (April 2026)
    const currentExpenses = [
      { id: 'exp_1', date: '2026-04-01', category: 'Food', shop: 'Grocery Store', amount: 2500, createdAt: '2026-04-01T00:00:00.000Z', updatedAt: '2026-04-01T00:00:00.000Z' },
      { id: 'exp_2', date: '2026-04-03', category: 'Transport', shop: 'Uber', amount: 450, createdAt: '2026-04-03T00:00:00.000Z', updatedAt: '2026-04-03T00:00:00.000Z' },
      { id: 'exp_3', date: '2026-04-05', category: 'Entertainment', shop: 'Cinema', amount: 800, createdAt: '2026-04-05T00:00:00.000Z', updatedAt: '2026-04-05T00:00:00.000Z' },
      { id: 'exp_4', date: '2026-04-07', category: 'Food', shop: 'Restaurant', amount: 1200, createdAt: '2026-04-07T00:00:00.000Z', updatedAt: '2026-04-07T00:00:00.000Z' },
      { id: 'exp_5', date: '2026-04-10', category: 'Shopping', shop: 'Online Store', amount: 3500, createdAt: '2026-04-10T00:00:00.000Z', updatedAt: '2026-04-10T00:00:00.000Z' }
    ];

    // Sample expenses for last month (March 2026)
    const lastMonthExpenses = [
      { id: 'exp_prev_1', date: '2026-03-05', category: 'Food', shop: 'Grocery Store', amount: 3000, createdAt: '2026-03-05T00:00:00.000Z', updatedAt: '2026-03-05T00:00:00.000Z' },
      { id: 'exp_prev_2', date: '2026-03-10', category: 'Transport', shop: 'Gas Station', amount: 2000, createdAt: '2026-03-10T00:00:00.000Z', updatedAt: '2026-03-10T00:00:00.000Z' },
      { id: 'exp_prev_3', date: '2026-03-15', category: 'Utilities', shop: 'Electric Company', amount: 1500, createdAt: '2026-03-15T00:00:00.000Z', updatedAt: '2026-03-15T00:00:00.000Z' },
      { id: 'exp_prev_4', date: '2026-03-20', category: 'Entertainment', shop: 'Netflix', amount: 500, createdAt: '2026-03-20T00:00:00.000Z', updatedAt: '2026-03-20T00:00:00.000Z' }
    ];

    // Sample savings pockets
    const savingsPockets = [
      { id: 'sav_1', name: 'Emergency Fund', item: 'Rainy day savings', targetAmount: 100000, monthlyContribution: 5000, currentSaved: 15000, createdAt: '2026-04-01T00:00:00.000Z', updatedAt: '2026-04-01T00:00:00.000Z' },
      { id: 'sav_2', name: 'Vacation', item: 'Beach trip', targetAmount: 50000, monthlyContribution: 3000, currentSaved: 9000, createdAt: '2026-04-01T00:00:00.000Z', updatedAt: '2026-04-01T00:00:00.000Z' },
      { id: 'sav_3', name: 'New Laptop', item: 'MacBook Pro', targetAmount: 150000, monthlyContribution: 10000, currentSaved: 20000, createdAt: '2026-04-01T00:00:00.000Z', updatedAt: '2026-04-01T00:00:00.000Z' }
    ];

    // Insert all data
    await db.collection('salary_settings').insertOne(salary);
    await db.collection('expenses').insertMany([...currentExpenses, ...lastMonthExpenses]);
    await db.collection('savings_pockets').insertMany(savingsPockets);

    res.status(200).json({ message: 'Database seeded successfully', seeded: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
