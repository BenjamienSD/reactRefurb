// IMPORTS
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// IMPORT ROUTES
const users = require('./routes/api/users');
const forms = require('./routes/api/forms');
const tables = require('./routes/api/tables');

// test registrations
const registrations = require('./routes/api/registrations');

// INIT APP
// const app = express();
const app = express().use('*', cors());

connectDB();

// Init middleware
app.use(express.json({ extended: false }));

// USE ROUTES
app.use('/api/users', users);
app.use('/api/forms', forms);
app.use('/api/tables', tables);
app.use('/api/registrations', registrations);

// PORT CONFIG
const PORT = process.env.PORT || 5030;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
