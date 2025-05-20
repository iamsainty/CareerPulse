const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectToMongo = require("./lib/connectMongo");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

const userAuthRoutes = require("./routes/userAuth");
const userProfileRoutes = require("./routes/userProfile");
const getJobsRoutes = require("./routes/getJobs");
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

connectToMongo();

app.use("/user-auth", userAuthRoutes);
app.use("/user-profile", userProfileRoutes);
app.use("/jobs", getJobsRoutes);
app.get("/", (req, res) => {
  res.send("Backend is running...");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
