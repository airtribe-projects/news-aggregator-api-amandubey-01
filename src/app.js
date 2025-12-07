require('dotenv').config();
const express = require('express');
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes needs to be mounted.

// No app.listen() here.
// We only configure the app. 

// Mount routes
app.use('/users', require('./routes/authRoutes'));

// Mount userRoutes
app.use('/users', require('./routes/userRoutes'));

// Mount news route
app.use('/news', require('./routes/newsRoutes'));

module.exports = app;