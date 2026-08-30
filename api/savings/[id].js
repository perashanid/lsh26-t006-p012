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
      const { name, item, targetAmount, monthlyContribution } = req.body;

      await db.collection('savings_pockets').updateOne(
        { id },
        {
          $set: {
            name,
            item,
            targetAmount: Number(targetAmount),
            monthlyContribution: Number(monthlyContribution),
            updatedAt: new Date().toISOString()
          }
        }
      );

      const pocket = await db.collection('savings_pockets').findOne({ id });
      return res.status(200).json(pocket);
    }

    if (req.method === 'DELETE') {
      await db.collection('savings_pockets').deleteOne({ id });
      return res.status(200).json({ success: true });
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
