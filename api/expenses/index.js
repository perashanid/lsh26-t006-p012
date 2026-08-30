import { connectToDatabase } from '../_db.js';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const { db } = await connectToDatabase();

    if (req.method === 'GET') {
      const { month } = req.query;
      const query = month ? { date: { $regex: `^${month}` } } : {};
      const expenses = await db.collection('expenses').find(query).sort({ date: -1 }).toArray();
      return res.status(200).json(expenses);
    }

    if (req.method === 'POST') {
      const { date, category, shop, amount } = req.body;
      const now = new Date().toISOString();

      const expense = {
        id: `exp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        date,
        category,
        shop,
        amount: Number(amount),
        createdAt: now,
        updatedAt: now
      };

      await db.collection('expenses').insertOne(expense);
      return res.status(200).json(expense);
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
