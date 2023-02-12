const express = require("express");
const cors = require("cors");
const DBConn = require("./database/DBConn");
const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

const userRoutes = require("./routes/userRoute");
app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to Crafty Commerce server");
});

DBConn(process.env.DATABASE_URI);

app.listen(5000, () => {
  console.log("Crafty Commerce server running on port 5000");
});
