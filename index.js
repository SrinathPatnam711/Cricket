const express = require('express');
const dotenv = require('dotenv').config();
const path = require('path');

const cors = require('cors');

const connectDB = require('./config/connectDB');

const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const PlayerRoutes = require("./routes/PlayerRoutes"); 

const app = express();

app.use(cors());

app.use(express.static('public'));

//connect to db
connectDB();

//middleware work with incoming request
//set the middleware to parse the data
app.use(express.json());
 
//router to organize our routes
app.use('/api/Players', PlayerRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT | 5000;

app.listen(PORT, 'localhost', () => {
  console.log('Server is running');
});
