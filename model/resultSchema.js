const mongoose = require('mongoose');

// Define the schema
const userSchema = new mongoose.Schema({
  srNo: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  qualification: {
    type: String,
    required: true
  },
  registrationNo: {
    type: String,
    required: true,
    unique: true
  },
  registrationDate: {
    type: Date,
    required: true
  },
  validUpto: {
    type: Date,
    required: true
  }
});

// Export the model
module.exports = mongoose.model('User', userSchema);
