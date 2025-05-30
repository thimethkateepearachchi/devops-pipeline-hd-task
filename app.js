const express = require('express');
const app = express();
app.use(express.json());

let users = [
  { id: 1, username: 'alice' },
  { id: 2, username: 'bob' }
];

// Root endpoint
app.get('/', (req, res) => {
  res.send('Hello from DevOps Pipeline!');
});

// Get all users
app.get('/users', (req, res) => {
  res.json(users);
});

// Get user by ID
app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === +req.params.id);
  if (!user) return res.status(404).send('User not found');
  res.json(user);
});

// Create new user
app.post('/users', (req, res) => {
  const newUser = { id: users.length + 1, username: req.body.username };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Update user
app.put('/users/:id', (req, res) => {
  const user = users.find(u => u.id === +req.params.id);
  if (!user) return res.status(404).send('User not found');
  user.username = req.body.username || user.username;
  res.json(user);
});

// Delete user
app.delete('/users/:id', (req, res) => {
  users = users.filter(u => u.id !== +req.params.id);
  res.status(204).send();
});

// Simple login endpoint (mocked for demo)
app.post('/login', (req, res) => {
  const { username } = req.body;
  if (username && users.find(u => u.username === username)) {
    return res.json({ message: `Welcome, ${username}!`, token: 'fake-jwt-token' });
  }
  res.status(401).json({ message: 'Invalid credentials' });
});

module.exports = app;
