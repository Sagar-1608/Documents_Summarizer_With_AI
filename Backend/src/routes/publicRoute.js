
import { Router } from "express";
import { getActiveCategory, getAllCategories, getCategoryById,} from "../controllers/category.controller.js";
import { auth } from "../middlewares/auth.middleware.js";
import { getAllTransactions, getTransactionById, getTransactionsByCategory} from "../controllers/transaction.controller.js";

const router = Router()


// category routes 
router.route("/category/").get(getAllCategories);
router.route("/category/:id").get(getCategoryById);
router.route("/active-category").get(getActiveCategory);

// transction routes
router.route("/transaction/").get(getAllTransactions);
router.route("/transaction/:id").get(getTransactionById);
router.route("/transaction/bycategory/:id").get(getTransactionsByCategory);




export default router