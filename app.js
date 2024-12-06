const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/mongoose'); // Adjust the path to your dbConfig file
const User = require('./model/resultSchema'); // Adjust the path to your user model
const cors = require('cors'); 
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors())

// Connect to MongoDB
connectDB();

// Routes

// API to add a user
app.post('/api/users', async (req, res) => {
    try {
      const { name, qualification, registrationNo, registrationDate, validUpto } = req.body;
  
      // Find the highest current srNo and increment it
      const lastUser = await User.findOne().sort({ srNo: -1 }); // Get the user with the highest srNo
      const nextSrNo = lastUser ? lastUser.srNo + 1 : 1; // If no user exists, start with srNo = 1
  
      const newUser = new User({
        srNo: nextSrNo,
        name,
        qualification,
        registrationNo,
        registrationDate: registrationDate || Date.now(),
        validUpto
      });
  
      await newUser.save();
      res.status(201).json({ message: 'User added successfully', user: newUser });
    } catch (err) {
      res.status(500).json({ message: 'Error saving user', error: err.message });
    }
  });
  
// API to fetch all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ message: 'Users retrieved successfully', users });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err.message });
  }
});

app.post('/api/users/registration', async (req, res) => {
    const { registrationNo } = req.body;
    
    if (!registrationNo) {
      console.log("No registration number in the request body");
      return res.status(400).json({ message: 'Registration number is required' });
    }
  
    try {
      console.log("Searching for user with registration number:", registrationNo);
      const user = await User.findOne({ registrationNo });
  
      if (!user) {
        console.log("User not found");
        return res.status(404).json({ message: 'User not found' });
      }
  
      console.log("User found:", user);
      res.status(200).json({ message: 'User retrieved successfully', user });
    } catch (err) {
      console.error("Error fetching user:", err.message);
      res.status(500).json({ message: 'Error fetching user', error: err.message });
    }
  });
  
  
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
