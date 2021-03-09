const mongoose = require('mongoose');

const RegistrationSchema = new mongoose.Schema({
  naam: {
    type: String,
    required: false,
    default: 'Anoniem',
  },
  datum: {
    type: Date,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  soortVraag: {
    type: String,
    required: false,
  },
  vraag: {
    type: String,
    required: true,
  },
  antwoord: {
    type: String,
    required: true,
  },
  tijd: {
    type: String,
  },
});

module.exports = mongoose.model('registration', RegistrationSchema);
