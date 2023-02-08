const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const expressValidator = require("express-validator");
require("dotenv").config();

const authRoutes = require("./routes/auth-routes");
const userRoutes = require("./routes/user-routes");
const categoryRoutes = require("./routes/category-routes");
const productRoutes = require("./routes/product-routes");
const braintreeRoutes = require("./routes/braintree-routes");
const orderRoutes = require("./routes/order-routes");

const app = express();

const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Database Connected.");
  });

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://tradezilla.vercel.app");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", braintreeRoutes);
app.use("/api", orderRoutes);

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.json("Server Started");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
