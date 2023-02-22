const express = require("express");
const cors = require("cors");
const DBConn = require("./database/DBConn");
const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

const userRoutes = require("./routes/userRoute");
const adminRoutes = require("./routes/adminRoutes");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const ordersRoutes = require("./routes/ordersRoutes");
const paymentsRoutes = require("./routes/paymentsRoutes");

app.use("/users", userRoutes);
app.use("/admin", adminRoutes);
app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);
app.use("/orders", ordersRoutes);
app.use("/payments", paymentsRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to Crafty Commerce server");
});

DBConn(process.env.DATABASE_URI);

app.listen(5000, () => {
  console.log("Crafty Commerce server running on port 5000");
});
