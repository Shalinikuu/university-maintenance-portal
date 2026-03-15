const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const complaintRoutes = require("./routes/complaintRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/maintenanceDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/complaint", complaintRoutes);

app.get("/", (req, res) => {
  res.send("Backend Running Successfully 🚀");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});