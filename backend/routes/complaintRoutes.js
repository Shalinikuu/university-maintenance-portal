const express = require("express");
const router = express.Router();
const Complaint = require("../models/Complaint");
const multer = require("multer");

// ===== Multer Config =====
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });


// ================== UPLOAD COMPLAINT ==================
router.post("/upload", upload.single("image"), async (req, res) => {
  try {

    const {
      userId,
      description,
      category,
      location,
      latitude,
      longitude
    } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "User ID missing" });
    }

    let priority = "Medium";
    const desc = description ? description.toLowerCase() : "";

    // 🧠 AI-like Smart Logic
    if (
      category === "Electrical" ||
      category === "Plumbing" ||
      desc.includes("fire") ||
      desc.includes("smoke") ||
      desc.includes("urgent") ||
      desc.includes("short circuit")
    ) {
      priority = "High";
    }
    else if (
      category === "IT Issue" ||
      desc.includes("slow") ||
      desc.includes("minor")
    ) {
      priority = "Low";
    }
    else {
      priority = "Medium";
    }

    const newComplaint = new Complaint({
      userId,
      image: req.file ? req.file.filename : "",
      damageType: category,
      priority,
      status: "Pending",
      description,
      location,
      latitude: latitude ? Number(latitude) : null,
      longitude: longitude ? Number(longitude) : null
    });

    await newComplaint.save();

    res.status(200).json({
      message: "Complaint Submitted Successfully",
    });

  } catch (error) {
    console.log("Upload Error:", error);
    res.status(500).json({
      error: error.message,
    });
  }
});


// ================== GET USER COMPLAINTS ==================
router.get("/user/:userId", async (req, res) => {
  try {
    const complaints = await Complaint.find({
      userId: req.params.userId,
    }).sort({ createdAt: -1 });

    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// ================== GET ALL COMPLAINTS ==================
router.get("/all", async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// ================== UPDATE STATUS ==================
router.put("/update/:id", async (req, res) => {
  try {
    await Complaint.findByIdAndUpdate(req.params.id, {
      status: req.body.status,
    });

    res.status(200).json({
      message: "Status Updated Successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;