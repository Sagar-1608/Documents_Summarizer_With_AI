import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';

class Transaction extends Model {}

Transaction.init({
    Upload_Number: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Category_Id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Folder_Path: {
        type: DataTypes.STRING(200),
        allowNull: true
    },
    File_Name: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    Sequence: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    File_Type: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            isIn: [['pdf', 'jpg', 'png', 'docx', 'xlsx', 'txt']] // extend as needed
        }
    },
    Upload_Title: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    Upload_Description: {
        type: DataTypes.STRING(1000),
        allowNull: true
    },
    Start_Date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    End_Date: {
        type: DataTypes.DATE,
        allowNull: true
    },
    Created_By: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    Created_Date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    Updated_By: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    Updated_Date: {
        type: DataTypes.DATE,
        allowNull: true
    },
   
}, {
    sequelize,
    modelName: 'Transaction',                 
    tableName: 'BPL_UPLOAD_TRANSACTION',       
    timestamps: false
});

async function syncModel() {
    try {
      await sequelize.sync({ force: false }); // { force: false } will not drop the table if it already exists
      console.log('Transaction table synchronized successfully!');
    } catch (error) {
      console.error('Error synchronizing the model:', error);
    }
  }

syncModel();

export default Transaction;
