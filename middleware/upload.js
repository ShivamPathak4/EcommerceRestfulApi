const multer = require('multer');

// Multer stores files in memory before sending them to Cloudinary
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: (req, file, cb) => {
    // Only allow image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true); // Accept file
    } else {
      cb(new Error('Only images are allowed!'), false); // Reject file
    }
  }
});

module.exports = upload;