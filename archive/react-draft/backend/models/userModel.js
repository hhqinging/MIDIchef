import mongoose from 'mongoose';

const userModel = new mongoose.Schema({
  name: { type: String, require: true },
  address: {
    type: String,
    required: true,
    unique: true,
  },
});
