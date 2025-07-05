import express from 'express';
import cors from 'cors';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate input
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please fill in all fields' 
      });
    }

    // Initialize Google Sheets
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);
    
    // Authenticate with Google
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    });

    // Load the document
    await doc.loadInfo();
    
    // Get the first sheet
    const sheet = doc.sheetsByIndex[0];
    
    // Add the new row
    await sheet.addRow({
      'Timestamp': new Date().toISOString(),
      'Name': name,
      'Email': email,
      'Message': message,
      'Status': 'New'
    });

    res.status(200).json({ 
      success: true, 
      message: 'Message saved successfully!' 
    });

  } catch (error) {
    console.error('Sheets error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to save message. Please try again.' 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Sheets server is running' });
});

app.listen(PORT, () => {
  console.log(`Sheets server running on port ${PORT}`);
}); 