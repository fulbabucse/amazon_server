const jwt = require("jsonwebtoken");

// Authentication Check
const authentication = async (req, res, next) => {
  try {
    // Token From Client side
    const token = req.headers?.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).send({ message: "Unauthorized Access" });
    }

    jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
      if (err) {
        return res.status(403).send({ message: "Forbidden Access" });
      }
      req.decoded = decoded;
      next();
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = authentication;
