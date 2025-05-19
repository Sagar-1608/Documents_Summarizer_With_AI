
import { Router } from "express";
import { createCategory, deleteCategory, getAllCategories, getAllCategoriesDashboard, getCategoryById, updateCategory } from "../controllers/category.controller.js";
import { auth } from "../middlewares/auth.middleware.js";
import { createTransaction, deleteTransaction, updateTransaction } from "../controllers/transaction.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = Router()


// category routes 
router.route("/category/").get(auth,getAllCategoriesDashboard);
router.route("/category/").post(auth,createCategory);
router.route("/category/:id").put(auth,updateCategory);
router.route("/category/:id").delete(auth, deleteCategory);

// transction routes
router.route("/transaction/").post(auth,upload.single('file'),createTransaction);
router.route("/transaction/:id").put(auth,upload.single('file'),updateTransaction);
router.route("/transaction/:id").delete(auth,deleteTransaction);



export default router