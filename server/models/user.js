const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  location: {
    type: String,
  },
  yearsOfExperience: {
    type: Number,
  },
  skills: {
    type: [String],
  },
  jobType: {
    type: String,
    enum: ["Remote", "Hybrid", "Onsite"],
  },
  createdAt: {
    type: Date,
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;
