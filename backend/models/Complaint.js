const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
    userId: String,
    image: String,
    damageType: String,
    priority: String,

    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending"
    },

    description: String,
    location: String,

    // ✅ NEW: Assigned Staff
    assignedStaff: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    // ✅ NEW: Remarks by staff
    remarks: [
      {
        text: String,
        date: {
          type: Date,
          default: Date.now
        }
      }
    ],

    latitude: Number,
    longitude: Number
  },
  { timestamps: true }
);

module.exports = mongoose.model("Complaint", complaintSchema);