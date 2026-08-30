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
      const savings = await db.collection('savings_pockets').find({}).toArray();
      return res.status(200).json(savings);
    }

    if (req.method === 'POST') {
      const { name, item, targetAmount, monthlyContribution } = req.body;
      const now = new Date().toISOString();

      const pocket = {
        id: `sav_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name,
        item,
        targetAmount: Number(targetAmount),
        monthlyContribution: Number(monthlyContribution),
        currentSaved: 0,
        createdAt: now,
        updatedAt: now
      };

      await db.collection('savings_pockets').insertOne(pocket);
      return res.status(200).json(pocket);
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
