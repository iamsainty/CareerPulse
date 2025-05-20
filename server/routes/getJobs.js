const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const Job = require("../models/job");
const User = require("../models/user");
const router = express.Router();

// Function to calculate score based on user-job match
function getJobScore(job, user) {
  let score = 0;

  const jobSkills = Array.isArray(job.skills) ? job.skills : [];
  const userSkills = Array.isArray(user.skills) ? user.skills : [];

  const matchingSkills = jobSkills.filter((skill) =>
    userSkills.includes(skill)
  );
  score += matchingSkills.length * 10;

  if (
    job.location &&
    user.location &&
    job.location.toLowerCase() === user.location.toLowerCase()
  ) {
    score += 5;
  }

  if (
    job.jobType &&
    user.jobType &&
    job.jobType.toLowerCase() === user.jobType.toLowerCase()
  ) {
    score += 5;
  }

  if (
    typeof job.experienceInYears === "number" &&
    typeof user.experienceInYears === "number"
  ) {
    const expDiff = Math.abs(job.experienceInYears - user.experienceInYears);
    score += Math.max(0, 10 - expDiff * 2);
  }

  return score;
}

// Route to get top 5 recommended jobs
router.get("/getJobs", verifyToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const jobs = await Job.find();

    const jobScores = jobs.map((job) => ({
      job,
      score: getJobScore(job, user),
    }));

    const topJobs = jobScores
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map(({ job, score }) => ({
        ...job.toObject(),
        score,
      }));

    res.status(200).json({ jobs: topJobs });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});

module.exports = router;
