const express = require('express');
const connectDB = require('./database/connections');
require('dotenv').config();
const routers = require('./routes/routes');
const cors = require('cors');

// express app
const app = express();
const port = process.env.port || 3000;

// cors
app.use(cors());

// middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use('/api/datalog', routers);

// connect to mongodb
connectDB();

app.listen(port, () => {
  console.log(`Server up and running on http://localhost:${port}`);
});
