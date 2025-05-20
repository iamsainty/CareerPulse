const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = verifyToken;
