const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },
  jobType: {
    type: String,
    enum: ["Remote", "Hybrid", "Onsite"],
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  salary: {
    type: Number,
    required: true,
  },
  experienceInYears: {
    type: Number,
    required: true,
  },
  postedAt: {
    type: Date,
    default: Date.now,
  },
});

const Job = mongoose.models.Job || mongoose.model("Job", jobSchema);

module.exports = Job;