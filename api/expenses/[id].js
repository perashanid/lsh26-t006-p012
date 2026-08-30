import { connectToDatabase } from '../_db.js';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { id } = req.query;

  try {
    const { db } = await connectToDatabase();

    if (req.method === 'PUT') {
      const { date, category, shop, amount } = req.body;

      await db.collection('expenses').updateOne(
        { id },
        {
          $set: {
            date,
            category,
            shop,
            amount: Number(amount),
            updatedAt: new Date().toISOString()
          }
        }
      );

      const expense = await db.collection('expenses').findOne({ id });
      return res.status(200).json(expense);
    }

    if (req.method === 'DELETE') {
      await db.collection('expenses').deleteOne({ id });
      return res.status(200).json({ success: true });
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
