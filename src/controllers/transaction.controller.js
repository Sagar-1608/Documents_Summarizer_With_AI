import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ÀpiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import Transaction from './../models/transaction.modal.js';
import path from 'path';
import Category from "../models/category.model.js";

// Create Transaction
// export const createTransaction = asyncHandler(async (req, res) => {
//     const {
//         Category_Id,
//         File_Name,
//         Sequence,
//         File_Type,
//         Upload_Title,
//         Upload_Description,
//         End_Date,
//     } = req.body;

//     const Created_By = req.user.Emp_Name;

//     if (!Category_Id || !File_Name || !File_Type || !Upload_Title) {
//         throw new ApiError(400, 'Required fields are missing');
//     }
//     if(!Created_By) {throw new ApiError(401, "Unauthorized user")}

//     const transaction = await Transaction.create({
//         Category_Id,
//         Folder_Path:"/public/transaction",
//         File_Name,
//         Sequence,
//         File_Type,
//         Upload_Title,
//         Upload_Description,
//         Start_Date:new Date(),
//         End_Date,
//         Created_By,
//         Created_Date: new Date(),
//     });

//     res.status(201).json(new ApiResponse(201, transaction, 'Transaction created successfully'));
// });

export const createTransaction = asyncHandler(async (req, res) => {

   try {
     const {
       Category_Id,
       Sequence,
       Upload_Title,
       Upload_Description,
       End_Date
     } = req.body;
     console.log(req.body)
     const Created_By = req.user.Emp_Name;
      // console.log("checking file",req.file)
      // console.log(Category_Id, Upload_Title)
 
     // Check if required fields and file are present
     if (!Category_Id || !Upload_Title || !req.file) {
       throw new ApiError(400, 'Required fields or file are missing');
     }
   
     if (!Created_By) {
       throw new ApiError(401, 'Unauthorized user');
     }
   
     // Check if the file exists and has the necessary properties
     if (!req.file || !req.file.originalname || !req.file.filename) {
       throw new ApiError(400, 'File data is missing or malformed');
     }
   
     // Extract file extension and ensure it's valid
     const ext = path.extname(req.file.originalname).toLowerCase().replace('.', '');
   
     // If file extension is empty or invalid, handle the error
     if (!ext || ext === '') {
       throw new ApiError(400, 'Invalid file type');
     }
   
     const filePath = `/uploads/${req.file.filename}`;
   
     // Create the transaction
     const transaction = await Transaction.create({
       Category_Id,
       Folder_Path: filePath,
       File_Name: req.file.filename,
       Sequence,
       File_Type: ext, // Automatically extracted from the file
       Upload_Title,
       Upload_Description,
       Start_Date: new Date(),
       End_Date,
       Created_By,
       Created_Date: new Date()
     });
   
     res.status(201).json(new ApiResponse(201, transaction, 'Transaction created successfully'));
   } catch (error) {
    console.log(error)
    throw new ApiError(500, "Internal server error")
    
   }
  });
  

// Update Transaction
// export const updateTransaction = asyncHandler(async (req, res) => {
//     const { id } = req.params;
//     const {
//         Category_Id,
//         File_Name,
//         Sequence,
//         File_Type,
//         Upload_Title,
//         Upload_Description,
//         Start_Date,
//         End_Date
//     } = req.body;
//     const Updated_By = req.user.Emp_Name;

//     const transaction = await Transaction.findByPk(id);

//     if (!transaction) {
//         throw new ApiError(404, 'Transaction not found');
//     }

//     transaction.Category_Id = Category_Id || transaction.Category_Id;
//     transaction.File_Name = File_Name || transaction.File_Name;
//     transaction.Sequence = Sequence || transaction.Sequence;
//     transaction.File_Type = File_Type || transaction.File_Type;
//     transaction.Upload_Title = Upload_Title || transaction.Upload_Title;
//     transaction.Upload_Description = Upload_Description || transaction.Upload_Description;
//     transaction.Start_Date = Start_Date || transaction.Start_Date
//     transaction.End_Date = End_Date || transaction.End_Date;
//     transaction.Updated_By = Updated_By;
//     transaction.Updated_Date = new Date();

//     await transaction.save();

//     res.status(200).json(new ApiResponse(200, transaction, 'Transaction updated successfully'));
// });

export const updateTransaction = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    Category_Id,
    Sequence,
    Upload_Title,
    Upload_Description,
    Start_Date,
    End_Date
  } = req.body;

  const Updated_By = req.user.Emp_Name;

  const transaction = await Transaction.findByPk(id);
  if (!transaction) {
    throw new ApiError(404, 'Transaction not found');
  }

  if (!Updated_By) {
    throw new ApiError(401, 'Unauthorized user');
  }

  // If file is uploaded
  if (req.file) {
    if (!req.file.originalname || !req.file.filename) {
      throw new ApiError(400, 'File data is missing or malformed');
    }

    const ext = path.extname(req.file.originalname).toLowerCase().replace('.', '');
    if (!ext || ext === '') {
      throw new ApiError(400, 'Invalid file type');
    }

    transaction.File_Name = req.file.filename;
    transaction.Folder_Path = `/uploads/${req.file.filename}`;
    transaction.File_Type = ext;
  }

  // Update only if provided
  if (Category_Id !== undefined) transaction.Category_Id = Category_Id;
  if (Sequence !== undefined) transaction.Sequence = Sequence;
  if (Upload_Title !== undefined) transaction.Upload_Title = Upload_Title;
  if (Upload_Description !== undefined) transaction.Upload_Description = Upload_Description;
  if (Start_Date !== undefined) transaction.Start_Date = Start_Date;
  if (End_Date !== undefined) transaction.End_Date = End_Date;

  transaction.Updated_By = Updated_By;
  transaction.Updated_Date = new Date();

  await transaction.save();

  res.status(200).json(new ApiResponse(200, transaction, 'Transaction updated successfully'));
});

  
// Get All Transactions
export const getAllTransactions = asyncHandler(async (req, res) => {
    try {
Transaction.belongsTo(Category, {
  foreignKey: 'Category_Id',
  targetKey: 'Category_Id',
});
    const transactions = await Transaction.findAll({
      include: [
        {
          model: Category,
          attributes: ['Category_Name']
        }
      ]
    });
    if (!transactions) {
    throw new ApiError(404, 'Transaction not found');
  }
    const formatted = transactions.map(t => {
      const plain = t.get({ plain: true });
      return {
        ...plain,
        Category_Name: plain.Category?.Category_Name || null
      };
    });

    res.status(200).json(new ApiResponse(200, formatted, 'Fetched transaction'));


  } catch (error) {
    console.log(error)
    throw new ApiError(501, 'Internal server error');
  }
});

// Get Transaction by ID
export const getTransactionById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const transaction = await Transaction.findByPk(id);

    if (!transaction) {
        throw new ApiError(404, 'Transaction not found');
    }

    res.status(200).json(new ApiResponse(200, transaction, 'Fetched transaction'));
});

// get by category id
export const getTransactionsByCategory = asyncHandler(async (req,res)=>{
    const {id} = req.params

    if (!id) { throw new ApiError(401, "Categoty not found")}

    const transactions = await Transaction.findAll({
        where: {
          Category_Id: id
        }
      });
    
      if (transactions.length === 0) {
        throw new ApiError(404, "No transactions found for this category");
      }

      res.status(200).json(new ApiResponse(200, transactions, "Transactions fetched successfully"));

})

// Delete Transaction
export const deleteTransaction = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const transaction = await Transaction.findByPk(id);

    if (!transaction) {
        throw new ApiError(404, 'Transaction not found');
    }

    await transaction.destroy();
    res.status(200).json(new ApiResponse(200, {}, 'Transaction deleted successfully'));
});
