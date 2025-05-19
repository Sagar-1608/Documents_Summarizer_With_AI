import { asyncHandler } from "../utils/asyncHandler.js";
import Category from "../models/category.model.js";
import Transaction from "../models/transaction.modal.js";
import sequelize from "../config/db.js";
import { ApiError } from "../utils/ÀpiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Op } from "sequelize";


// CREATE CATEGORY
export const createCategory = asyncHandler(async (req, res) => {

  //take data from body and the middleware 
  // validate 
  // check if category already exist 
  // then cereate the category 
  // check the category created 
  // send response accordingly 

  const { Category_Name, End_Date } = req.body;
  const Created_By = req.user.Emp_Name;


  if (!Category_Name) {
    throw new ApiError(400, "Category Name required.");
  }
  if (!Created_By) { throw new ApiError(401, "Unautorized User") }

  const existedCategory = await Category.findOne({ where: { Category_Name: Category_Name } })

  if (existedCategory) { throw new ApiError(409, "This Category already exist") }

  const category = await Category.create({
    Category_Name: Category_Name,
    Category_Folder_Path: "/public/images/category",
    Separate_Render: 'N',
    Start_Date: new Date(),
    End_Date: End_Date,
    Created_By: Created_By,
    Created_Date: new Date(),
  });

  const createdCategory = Category.findByPk(category.Category_ID)

  return res.status(201).json(new ApiResponse(201, createdCategory, "Category created successfully"));
});


// UPDATE CATEGORY
export const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { Category_Name, Separate_Render, End_Date } = req.body
  const Updated_By = req.user.Emp_Name;

  if (!Category_Name) { throw new ApiError(400, "Cotegory name required") }
  if (!Updated_By) {
    throw new ApiError(401, "Unauthorized User");
  }

  const category = await Category.findByPk(id);

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  category.Category_Name = Category_Name || category.Category_Name;
  category.Separate_Render = Separate_Render || category.Separate_Render;
  category.End_Date = End_Date || category.End_Date;
  category.Updated_By = Updated_By;
  category.Updated_Date = new Date();

  await category.save();


  return res.status(200).json(new ApiResponse(200, category, "Category updated successfully"));
});


// GET ALL CATEGORIES
export const getAllCategories = asyncHandler(async (req, res) => {
  try {

    const currentDate = new Date();
    const categories = await Category.findAll({
      attributes: [
        "Category_Id",
        "Category_Name",
        "Created_By",
        "Created_Date",
        "End_Date",
        "Updated_Date",
        "Updated_By",
        "Separate_Render",
        [
          sequelize.literal(`(
            SELECT COUNT(*) 
            FROM BPL_UPLOAD_TRANSACTION t 
            WHERE t."Category_Id" = "Category"."Category_Id"
          )`),
          "transactionCount"
        ]
      ],
      order: [
        // Order by Created_Date ascending
        ["Created_Date", "DESC"]
      ]
    });
    if (categories.length === 0) {
      throw new ApiError(404, "No categories found");
    }

    const data = categories.map(cat => ({
      id: cat.Category_Id,
      name: cat.Category_Name,
      itemCount: parseInt(cat.get("transactionCount")),
      status: !cat.End_Date || new Date(cat.End_Date) > currentDate ? "Active" : "Inactive",
      createdBy: cat.Created_By || "--",
      createdOn: cat.Created_Date
        ? new Date(cat.Created_Date).toLocaleDateString()
        : "--",
      updatedAt: cat.Updated_Date
        ? new Date(cat.Updated_Date).toLocaleDateString()
        : "--",
      updatedBy: cat.Updated_By || "--",
      endDate: cat.End_Date
        ? new Date(cat.End_Date).toLocaleDateString()
        : "--",
      separateRender: cat.Separate_Render,
    }));

    return res
      .status(200)
      .json(new ApiResponse(200, data, "Categories fetched successfully"));
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new ApiError(500, "Something went wrong while fetching categories");
  }
});

export const getAllCategoriesDashboard = asyncHandler(async (req, res) => {
  try {
    const currentDate = new Date();

    // Using sequelize.literal() with adjusted SQL for Oracle

    const categories = await Category.findAll({
      attributes: [
        "Category_Id",
        "Category_Name",
        "End_Date",
        [
          sequelize.literal(`(
        SELECT COUNT(*) 
        FROM BPL_UPLOAD_TRANSACTION t 
        WHERE t."Category_Id" = "Category"."Category_Id"
      )`),
          "transactionCount"
        ]
      ]
    });

    if (!categories) { throw new ApiError(404, "Category not found") }

    const totalCategories = categories.length;

    const formatted = categories.map(cat => ({
      id: cat.Category_Id,
      name: cat.Category_Name,
      status: !cat.End_Date || new Date(cat.End_Date) > currentDate ? "Active" : "Inactive",
      transactionCount: cat.get("transactionCount")
    })).slice(0, 4);

    const catcount= categories.map(cat => ({
      transactionCount: cat.get("transactionCount")
    }));
    
    const totalTransactions = catcount.reduce((sum, cat) => sum + parseInt(cat.transactionCount || 0), 0);
    const stats = [
      { title: "Total Categories", value: totalCategories, icon: "FaFolder" },
      { title: "Total Posts", value: totalTransactions, icon: "FaFileAlt" },
      { title: "Active Users", value: "45", icon: "FaUsers" },
      { title: "Total Views", value: "2.4k", icon: "FaEye" },
    ];

    return res.status(200).json(new ApiResponse(200, { stats, categories: formatted }, "Categories fetched successfully"));
  } catch (err) {
    console.error("Dashboard summary error:", err);
    res.status(500).json(new ApiResponse(500, {}, "Internal server error"));
  }


});


export const getCategoryById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findByPk(id)

    if (!category) {
      throw new ApiError(404, "Category not found");
    }
    const transactions = await Transaction.findAll({
      where: { Category_Id: id },
      order: [['Created_Date', 'DESC']], // optional: sort by created date
    });

    // Step 3: Combine and return
    return res.status(200).json(
      new ApiResponse(200, {
        category,
        transactions,
      }, "Category and transactions fetched successfully")
    );

    return res
      .status(200)
      .json(new ApiResponse(200, category, "Category fetched successfully"));

  } catch (error) {
    console.log(error)
    throw new ApiError(501, "Internal server error");

  }
});
export const getActiveCategory = asyncHandler(async (req, res) => {
  try {

    const categories = await Category.findAll(
      {
        attributes: ['Category_Id', 'Category_Name'],
        where: {
          End_Date: {
            [Op.gt]: new Date()  // End_Date > current date
          }
        }
      }
    )
    if (!categories) { throw new ApiError(404, "Category not found") }

     return res.status(200).json(new ApiResponse(200, categories, "Categories fetched successfully"));

  } catch (error) {
    console.log(error)
    throw new ApiError(501, "Internal servaer error")

  }
})


// DELETE CATEGORY
export const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const category = await Category.findByPk(id);

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  await category.destroy();

  return res.status(200).json(new ApiResponse(200, {}, "Category deleted successfully"));
});


