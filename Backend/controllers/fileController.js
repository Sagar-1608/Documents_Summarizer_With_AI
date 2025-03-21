import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

const uploadFile = (req, res) => {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });
    res.json({ filePath: `/uploads/${req.file.filename}` });
};

export { upload, uploadFile };
