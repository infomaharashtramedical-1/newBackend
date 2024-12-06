const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://infomaharashtramedicalcouncil:Abhi123@maharashtra.i1ynh.mongodb.net/?retryWrites=true&w=majority&appName=maharashtra', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
