import express from 'express';
import cors from 'cors';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
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
    console.log('Received contact form submission:', req.body);
    
    const { name, email, message } = req.body;

    // Validate input
    if (!name || !email || !message) {
      console.log('Validation failed: missing fields');
      return res.status(400).json({ 
        success: false, 
        message: 'Please fill in all fields' 
      });
    }

    console.log('Input validation passed');

    // Initialize Google Sheets
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);
    console.log('Created spreadsheet instance');
    
    // Fix private key formatting
    let privateKey = process.env.GOOGLE_PRIVATE_KEY;
    if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
      privateKey = privateKey.slice(1, -1);
    }
    privateKey = privateKey.replace(/\\n/g, '\n');
    
    console.log('Private key formatted');
    
    // Authenticate with Google using service account credentials
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: privateKey,
    });
    
    console.log('Authentication successful');

    // Load the document
    await doc.loadInfo();
    console.log('Document loaded');
    
    // Get the first sheet
    const sheet = doc.sheetsByIndex[0];
    console.log('Got sheet:', sheet.title);
    
    // Add the new row
    await sheet.addRow({
      'Timestamp': new Date().toISOString(),
      'Name': name,
      'Email': email,
      'Message': message,
      'Status': 'New'
    });
    
    console.log('Row added successfully');

    res.status(200).json({ 
      success: true, 
      message: 'Message saved successfully!' 
    });

  } catch (error) {
    console.error('Error in contact endpoint:', error);
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