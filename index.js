const express = require("express");
const cors = require("cors");
const DBConn = require("./database/DBConn");
const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(express.json({ limit: "50mb", extended: true }));
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 100000 })
);

const userRoutes = require("./routes/userRoute");
const adminRoutes = require("./routes/adminRoutes");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const ordersRoutes = require("./routes/ordersRoutes");
const paymentsRoutes = require("./routes/paymentsRoutes");

app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/payments", paymentsRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to Amazon server");
});

DBConn(process.env.DATABASE_URI);

app.listen(5000, () => {
  console.log("Amazon server running on port 5000");
});
