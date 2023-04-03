require('dotenv').config();
const express = require('express');
const routers = require('./routes');

const app = express();

app.use(
  express.urlencoded({ extended: true }),
  express.json(),
);

// Adding routes here
app.use('/v1', routers);

// Error Handling
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    success: false,
    message: err.message,
  });
});

module.exports = app;
