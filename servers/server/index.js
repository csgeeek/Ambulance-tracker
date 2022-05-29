const PORT = process.env.PORT || 8080;

const dotenv = require('dotenv')
dotenv.config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();

const cors = require('cors');

mongoose.connect(process.env.DB_URI, () => console.log('connected to DB'));

// MIDDLEWARES
app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/Auth.js');
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Hello');
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));