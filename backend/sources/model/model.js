const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schemas = new Schema({
  id: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  facility: {
    type: String,
    required: true,
  },
  issue: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
}, {timestamps: true});

module.exports = mongoose.model('CRUD_mtc', schemas);
