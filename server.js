import express from "express";
import cors from "cors";
import multer from "multer";
import cloudinary from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Allow requests from the frontend
app.use(express.json()); // Parse JSON data


// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure Multer to store files in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Upload image route
app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload_stream(
      { folder: "gallery" },  // Optional: replace 'gallery' with your Cloudinary folder
      (error, result) => {
        if (error) {
          console.error("Upload error:", error);
          return res.status(500).json({ success: false, message: "Upload failed", error });
        }
        res.json({ success: true, url: result.secure_url });
      }
    ).end(req.file.buffer);
    
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
});

// Test route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Start the server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
