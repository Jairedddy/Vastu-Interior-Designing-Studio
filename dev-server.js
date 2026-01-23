import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());

// Import and use the Vercel-style API handlers
async function loadApiHandler(apiPath) {
  try {
    const handler = await import(apiPath);
    return handler.default;
  } catch (error) {
    console.error(`Error loading API handler from ${apiPath}:`, error);
    return null;
  }
}

// Contact API endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const handler = await loadApiHandler('./api/contact.js');
    if (handler) {
      return handler(req, res);
    }
    res.status(500).json({ success: false, message: 'API handler not found' });
  } catch (error) {
    console.error('Error in contact API:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Health check endpoint
app.get('/api/health', async (req, res) => {
  try {
    const handler = await loadApiHandler('./api/health.js');
    if (handler) {
      return handler(req, res);
    }
    res.status(200).json({ status: 'ok', message: 'Server is running' });
  } catch (error) {
    console.error('Error in health API:', error);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`\n🚀 Local API server running on http://localhost:${PORT}`);
  console.log(`📧 SMTP configured for: ${process.env.SMTP_USER || 'Not configured'}\n`);
});
