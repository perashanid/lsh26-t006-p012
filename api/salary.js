import { connectToDatabase } from './_db.js';

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
      const salary = await db.collection('salary_settings').findOne({});
      return res.status(200).json(salary);
    }

    if (req.method === 'POST') {
      const { monthlyAmount } = req.body;
      const now = new Date().toISOString();

      await db.collection('salary_settings').updateOne(
        {},
        {
          $set: {
            monthlyAmount: Number(monthlyAmount),
            effectiveFrom: now,
            updatedAt: now
          }
        },
        { upsert: true }
      );

      const salary = await db.collection('salary_settings').findOne({});
      return res.status(200).json(salary);
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
