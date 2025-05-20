const express = require("express");
const router = express.Router();
const User = require("../models/user");
const verifyToken = require("../middleware/verifyToken");
router.put("/update-profile", verifyToken, async (req, res) => {
  try {
    const { name, location, yearsOfExperience, skills, jobType } = req.body;
    const userId = req.user.userId;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        name,
        location,
        yearsOfExperience,
        skills,
        jobType,
      },
      { new: true }
    );

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Failed to update profile" });
  }
});

module.exports = router;
