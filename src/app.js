const express = require('express');
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes needs to be mounted.

// No app.listen() here.
// We only configure the app. 


module.exports = app;