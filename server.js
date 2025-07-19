const express = require('express');
const cors = require('cors');
const sql = require('mssql');

const app = express();
app.use(cors());

const dbConfig = {
  user: 'ramin',
  password: 'ram_1350',
  server: '10.85.66.20',
  database: 'payamresan',
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};

app.get('/api/callerids', async (req, res) => {
  try {
    await sql.connect(dbConfig);
    const result = await sql.query('SELECT callerid FROM tblallcallerids');
    res.json(result.recordset.map(row => row.callerid));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

app.get('/api/ping', (req, res) => {
  res.json({ message: 'pong' });
});

app.get('/api/finished-projects', async (req, res) => {
  try {
    await sql.connect(dbConfig);
    const result = await sql.query('SELECT * FROM vwLastPrj');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error fetching finished projects:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.get('/api/running-projects', async (req, res) => {
  try {
    await sql.connect(dbConfig);
    const result = await sql.query('SELECT * FROM vwStatForMainForm');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error fetching running projects:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.get('/api/messages', async (req, res) => {
  try {
    await sql.connect(dbConfig);
    const result = await sql.query('SELECT number, message FROM tblmessage');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error fetching messages:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.get('/api/commands', async (req, res) => {
  try {
    await sql.connect(dbConfig);
    const result = await sql.query('SELECT number FROM tblcommand');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error fetching commands:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});