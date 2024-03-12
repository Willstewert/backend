const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ msg: "unauthoriation" });
  }

  const jwtToken = token.replace("Bearer", token).trim();
  console.log("token from auth middleware", jwtToken);
  try {
    const isVerified = jwt.verify(jwtToken, "MERNSTACKPROJECT");
    console.log(isVerified);
    next();
  } catch (error) {
    return res.status(401).json({ msg: "unauthorication" });
  }
};

module.exports = authMiddleware;
