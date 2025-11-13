const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Database = require('better-sqlite3');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Serve frontend static files
const frontendPath = path.join(__dirname, '..', 'frontend');
app.use('/', express.static(frontendPath));

// Initialize DB
const db = new Database(path.join(__dirname, 'data.sqlite'));
// Create tables if not exist
db.prepare(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  email TEXT UNIQUE,
  role TEXT,
  created_at TEXT
)`).run();

db.prepare(`CREATE TABLE IF NOT EXISTS vendors (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  contact TEXT,
  category TEXT,
  created_at TEXT
)`).run();

db.prepare(`CREATE TABLE IF NOT EXISTS events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT,
  description TEXT,
  date TEXT,
  venue TEXT,
  created_at TEXT
)`).run();

// Helper to get timestamp
function now() {
  return new Date().toISOString();
}

// Generic CRUD for users
app.get('/api/users', (req, res) => {
  const rows = db.prepare('SELECT * FROM users ORDER BY id DESC').all();
  res.json(rows);
});

app.post('/api/users', (req, res) => {
  const { name, email, role } = req.body;
  try {
    const info = db.prepare('INSERT INTO users (name, email, role, created_at) VALUES (?, ?, ?, ?)').run(name, email, role || 'user', now());
    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(info.lastInsertRowid);
    res.json(user);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.put('/api/users/:id', (req, res) => {
  const id = req.params.id;
  const { name, email, role } = req.body;
  try {
    db.prepare('UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?').run(name, email, role, id);
    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(id);
    res.json(user);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.delete('/api/users/:id', (req, res) => {
  const id = req.params.id;
  db.prepare('DELETE FROM users WHERE id = ?').run(id);
  res.json({ success: true });
});

// Vendors CRUD
app.get('/api/vendors', (req, res) => {
  const rows = db.prepare('SELECT * FROM vendors ORDER BY id DESC').all();
  res.json(rows);
});

app.post('/api/vendors', (req, res) => {
  const { name, contact, category } = req.body;
  try {
    const info = db.prepare('INSERT INTO vendors (name, contact, category, created_at) VALUES (?, ?, ?, ?)').run(name, contact, category, now());
    const v = db.prepare('SELECT * FROM vendors WHERE id = ?').get(info.lastInsertRowid);
    res.json(v);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.put('/api/vendors/:id', (req, res) => {
  const id = req.params.id;
  const { name, contact, category } = req.body;
  db.prepare('UPDATE vendors SET name = ?, contact = ?, category = ? WHERE id = ?').run(name, contact, category, id);
  const v = db.prepare('SELECT * FROM vendors WHERE id = ?').get(id);
  res.json(v);
});

app.delete('/api/vendors/:id', (req, res) => {
  const id = req.params.id;
  db.prepare('DELETE FROM vendors WHERE id = ?').run(id);
  res.json({ success: true });
});

// Events CRUD
app.get('/api/events', (req, res) => {
  const rows = db.prepare('SELECT * FROM events ORDER BY id DESC').all();
  res.json(rows);
});

app.post('/api/events', (req, res) => {
  const { title, description, date, venue } = req.body;
  const info = db.prepare('INSERT INTO events (title, description, date, venue, created_at) VALUES (?, ?, ?, ?, ?)').run(title, description, date, venue, now());
  const e = db.prepare('SELECT * FROM events WHERE id = ?').get(info.lastInsertRowid);
  res.json(e);
});

app.put('/api/events/:id', (req, res) => {
  const id = req.params.id;
  const { title, description, date, venue } = req.body;
  db.prepare('UPDATE events SET title = ?, description = ?, date = ?, venue = ? WHERE id = ?').run(title, description, date, venue, id);
  const e = db.prepare('SELECT * FROM events WHERE id = ?').get(id);
  res.json(e);
});

app.delete('/api/events/:id', (req, res) => {
  const id = req.params.id;
  db.prepare('DELETE FROM events WHERE id = ?').run(id);
  res.json({ success: true });
});

// Simple health
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server listening on port', PORT);
});