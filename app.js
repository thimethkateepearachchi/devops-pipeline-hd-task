const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello from DevOps Pipeline!');
});

module.exports = app; // Export only the app
