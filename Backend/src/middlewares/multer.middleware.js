// import multer from 'multer';
// import path from 'path';
// import fs from 'fs';

// // Allowed file types
// const FILE_TYPES = ['.jpg', '.jpeg', '.png', '.pdf', '.docx', '.xlsx', '.txt'];

// // Upload folder
// const UPLOAD_DIR = path.join(process.cwd(), 'uploads');

// // Ensure the folder exists
// if (!fs.existsSync(UPLOAD_DIR)) {
//   fs.mkdirSync(UPLOAD_DIR, { recursive: true });
// }

// // Multer storage config
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     console.log("multer",req.body)
//     cb(null, UPLOAD_DIR);
//   },
//   filename: (req, file, cb) => {
//     console.log("multer1",req.body)
//     const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
//     const ext = path.extname(file.originalname);
//     cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
//   }
// });

// // File validation
// const fileFilter = (req, file, cb) => {
//   const ext = path.extname(file.originalname).toLowerCase();
//   if (FILE_TYPES.includes(ext)) cb(null, true);
//   else cb(new Error(`File type not allowed: ${ext}`), false);
// };

// export const upload = multer({
//   storage,
//   fileFilter,
//   limits: {
//     fileSize: 10 * 1024 * 1024 // 10 MB
//   }
// });


// // curl -X POST http://localhost:4000/api/transaction ^
// //   -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6MSwiRW1wX0lkIjoiMTA5ODM2IiwiRW1haWxfSWQiOiJzYWdhci5zLmphZGhhdkBhZGl0eWFiaXJsYS5jb20iLCJVc2VyX0lkIjoiamFkaGF2MTYwOCIsIkVtcF9OYW1lIjoiU2FnYXIgSmFkaGF2IiwiaWF0IjoxNzQ2MTU3ODAxLCJleHAiOjE3NDYyNDQyMDF9.dm124EM6Y5ywxZ5N3UUdi4lPrIUgQG3Z5IaZ0eiDMsU" ^
// //   -F "Category_Id=1" ^
// //   -F "Sequence=1" ^
// //   -F "Upload_Title=Sample Report" ^
// //   -F "Upload_Description=Quarterly stats" ^
// //   -F "End_Date=2025-12-31" ^
// //   -F "file=@C:\Users\sagar.s.jadhav\OneDrive - Aditya Birla Group\Pictures.login.png"



import multer from 'multer';
import path from 'path';
import fs from 'fs';


// Allowed file types
const FILE_TYPES = ['.jpg', '.jpeg', '.png', '.pdf', '.docx', '.xlsx', '.txt'];

// Upload folder
const UPLOAD_DIR = path.join(process.cwd(), 'uploads');

// Ensure the folder exists
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    //  const { Category_Name } = req.body || "Unknown";
    // const Category_Name ="Cat1"
    
      const {Category_Name} = req.body;
    
    const sanitizedCategory = Category_Name.replace(/\s+/g, '_'); // Replace spaces with underscores
    const date = new Date().toISOString().slice(0, 10); // Format: YYYY-MM-DD
    const randomNumber = Math.floor(Math.random() * 1e6); // 6-digit random number
    const ext = path.extname(file.originalname).toLowerCase();

    const filename = `${sanitizedCategory}_${date}_${randomNumber}${ext}`;
    cb(null, filename);
  }
});

// File validation
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (FILE_TYPES.includes(ext)) cb(null, true);
  else cb(new Error(`File type not allowed: ${ext}`), false);
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10 MB
  }
});
