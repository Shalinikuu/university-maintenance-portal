const express = require("express");
const router = express.Router();
const Complaint = require("../models/Complaint");
const multer = require("multer");
const fs = require("fs");

// ===== Ensure uploads folder exists =====
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

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

    if (!req.file) {
      return res.status(400).json({ error: "Image is required" });
    }

    let priority = "Medium";
    const desc = description ? description.toLowerCase() : "";

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

    const newComplaint = new Complaint({
      userId,
      image: req.file.filename,
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
      complaint: newComplaint
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});


// ================== GET USER COMPLAINTS ==================
router.get("/user/:userId", async (req, res) => {
  try {
    const complaints = await Complaint.find({
      userId: req.params.userId
    }).sort({ createdAt: -1 });

    res.json(complaints);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// ================== GET ALL (ADMIN) ==================
router.get("/all", async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate("assignedStaff", "name email")
      .sort({ createdAt: -1 });

    res.json(complaints);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// ================== ASSIGN STAFF ==================
router.put("/assign/:id", async (req, res) => {
  try {
    const { staffId } = req.body;

    const updated = await Complaint.findByIdAndUpdate(
      req.params.id,
      {
        assignedStaff: staffId,
        status: "In Progress"
      },
      { new: true }
    );

    res.json(updated);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ================== STAFF COMPLAINTS ==================
router.get("/staff/:staffId", async (req, res) => {
  try {
    const complaints = await Complaint.find({
      assignedStaff: req.params.staffId
    }).sort({ createdAt: -1 });

    res.json(complaints);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ================== UPDATE STATUS + REMARK ==================
router.put("/update/:id", async (req, res) => {
  try {
    const { status, remark } = req.body;

    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ error: "Not found" });
    }

    complaint.status = status;

    if (remark) {
      complaint.remarks.push({ text: remark });
    }

    await complaint.save();

    res.json({
      message: "Updated",
      complaint
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;