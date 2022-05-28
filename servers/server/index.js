const PORT = process.env.PORT || 8080;

const mongoose = require('mongoose');
const express = require('express');
const app = express();

const cors = require('cors');

mongoose.connect('mongodb+srv://user:user123@cluster1.gle5k.mongodb.net/DriverDB', () => console.log('connected to DB'));

// MIDDLEWARES
app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/Auth.js');
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Hello');
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));