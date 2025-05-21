const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const Job = require("../models/job");
const User = require("../models/user");
const router = express.Router();
const fetch = require("node-fetch");
const dotenv = require("dotenv");

dotenv.config();

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

router.post("/get-ai-jobs", verifyToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const allJobs = await Job.find({ jobType: user.jobType });

    const limitedJobs = allJobs.slice(0, 25);

    const prompt = `
You are a job recommender AI.
You are given a user's profile and must recommend exactly 3 jobs that best suit them.

User Profile:
Name: ${user.name}
Email: ${user.email}
Location: ${user.location}
Job Type: ${user.jobType}
Experience: ${user.experienceInYears} years
Skills: ${user.skills.join(", ")}

All Jobs: ${JSON.stringify(limitedJobs)}

Return only a valid JSON array of jobs using the format below:
[
  {
    "jobTitle": "string",
    "companyName": "string",
    "salary": "number",
    "location": "string",
    "skills": ["string", "string", "string"],
    "jobType": "string",
    "experienceInYears": "number",
    "description": "string",
    "postedAt": "date"
  }
]

Return only the JSON. Do not include explanations, markdown, or any extra text.
`;

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
        }),
      }
    );

    const data = await response.json();

    if (!data.choices || !data.choices[0]?.message?.content) {
      return res
        .status(500)
        .json({ error: "Invalid response from OpenAI", raw: data });
    }

    const jobs = JSON.parse(data.choices[0].message.content);

    res.status(200).json({ jobs });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ error: "Failed to fetch jobs", details: error });
  }
});

module.exports = router;
