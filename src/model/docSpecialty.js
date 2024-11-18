const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    fullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure that email is unique
    trim: true,
    lowercase: true,
  },
  specialty: {
    type: String,
    required: true,
    trim: true,
  },
  testResults: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TestResult'
}]
//   role: {
//     type: String,
//     default: 'doctor',
//   },
  // Additional fields can be added as needed, such as password, phone number, etc.
});

// Create a model from the schema
const DocSpecialty = mongoose.model('DocSpecialty', doctorSchema);

module.exports = DocSpecialty;
