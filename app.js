
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3500;
const DB_URL = process.env.DB_URL;

if (!DB_URL) {
  console.error('DB_URL environment variable is not set.');
  process.exit(1); // Exit process if DB_URL is missing
}

app.use(express.json());

// Route configuration
const bookRoutes = require('./routes/bookRoute');
app.use('/api', bookRoutes);

// Serve static files from 'public' directory
app.use(express.static('public'));

// Root route handler
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Connect to MongoDB
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to database successfully'))
.catch((error) => {
  console.error('Error connecting to database:', error.message);
  process.exit(1); // Exit process on database connection error
});

app.listen(PORT, () => {
  console.log(`Server started running at http://localhost:${PORT}/`);
});
