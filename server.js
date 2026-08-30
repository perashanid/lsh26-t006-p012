import dns from 'node:dns';
import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';

// Configure public DNS servers to resolve MongoDB Atlas SRV records reliably
dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);

const app = express();
const PORT = 3001;

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://shanidsajjatuz:RnHu2S9L9xu93Hn0@cluster0.usmr4rf.mongodb.net/?retryWrites=true&w=majority';
const DB_NAME = 'personal-ledger';

let db;
let client;

// Connect to MongoDB
async function connectDB() {
  try {
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    db = client.db(DB_NAME);
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
}

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', database: db ? 'connected' : 'disconnected' });
});

// Salary endpoints
app.get('/api/salary', async (req, res) => {
  try {
    const salary = await db.collection('salary_settings').findOne({});
    res.json(salary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/salary', async (req, res) => {
  try {
    const { monthlyAmount } = req.body;
    const now = new Date().toISOString();
    
    const result = await db.collection('salary_settings').updateOne(
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
    res.json(salary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Expenses endpoints
app.get('/api/expenses', async (req, res) => {
  try {
    const { month } = req.query;
    const query = month ? { date: { $regex: `^${month}` } } : {};
    const expenses = await db.collection('expenses').find(query).sort({ date: -1 }).toArray();
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/expenses', async (req, res) => {
  try {
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
    res.json(expense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/expenses/:id', async (req, res) => {
  try {
    const { id } = req.params;
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
    res.json(expense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/expenses/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection('expenses').deleteOne({ id });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Savings endpoints
app.get('/api/savings', async (req, res) => {
  try {
    const savings = await db.collection('savings_pockets').find({}).toArray();
    res.json(savings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/savings', async (req, res) => {
  try {
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
    res.json(pocket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/savings/:id', async (req, res) => {
  try {
    const { id } = req.params;
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
    res.json(pocket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/savings/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection('savings_pockets').deleteOne({ id });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Seed database
app.post('/api/seed', async (req, res) => {
  try {
    // Check if already seeded
    const expenseCount = await db.collection('expenses').countDocuments();
    if (expenseCount > 0) {
      return res.json({ message: 'Database already seeded', seeded: false });
    }

    // Import seed data
    const { default: seedData } = await import('./src/data/seed.ts');
    
    // Insert salary
    await db.collection('salary_settings').insertOne(seedData.salary);
    
    // Insert expenses
    await db.collection('expenses').insertMany(seedData.expenses);
    
    // Insert savings pockets
    await db.collection('savings_pockets').insertMany(seedData.savingsPockets);
    
    res.json({ message: 'Database seeded successfully', seeded: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📊 API endpoints available at http://localhost:${PORT}/api`);
  });
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n👋 Shutting down...');
  if (client) {
    await client.close();
  }
  process.exit(0);
});
