const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
    userId: String,
    image: String,
    damageType: String,
    priority: String,
    status: String,
    description: String,
    location: String,

    // 🔥 NEW LIVE LOCATION
    latitude: Number,
    longitude: Number
  },
  { timestamps: true }
);

module.exports = mongoose.model("Complaint", complaintSchema);