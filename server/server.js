const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

//routes
const authRoutes = require("./src/routes/auth");
const cartRoutes = require("./src/routes/cart");
const orderRoutes = require("./src/routes/order");
const productRoutes = require("./src/routes/product");
const confirmRoutes = require("./src/routes/confirm");
const recoveryRoutes = require("./src/routes/recover");
const adminRoutes = require("./src/routes/admin/auth");
const categoryRoutes = require("./src/routes/category");
const deliveryInfoRoutes = require("./src/routes/deliveryInfo");
const initialDataRoutes = require("./src/routes/admin/initialData");

//config
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000; //port

//database connection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

//frontend static
app.use("/", express.static("./build"));
var path = require("path");
app.use(express.static(path.join(__dirname, "public")));

//middleware
app.use(cors());
app.use(express.json());
app.use("/api", authRoutes);

app.use("/api", adminRoutes);
app.use("/api/", cartRoutes);
app.use("/api/", orderRoutes);
app.use("/api", productRoutes);
app.use("/api", categoryRoutes);
app.use("/api", initialDataRoutes);
app.use("/recover", recoveryRoutes);
app.use("/api/", deliveryInfoRoutes);
app.use("/confirmation", confirmRoutes);

//live port
app.listen(port, () => {
  console.log("Server is running on port:" + port);
});
