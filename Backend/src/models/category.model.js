import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';

class Category extends Model {}

Category.init({
  Category_Id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Category_Name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  Category_Folder_Path: {
    type: DataTypes.STRING(200),
    allowNull: true,
  },
  Separate_Render: {
    type: DataTypes.CHAR(1),
    allowNull: true,
  },
  Start_Date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  End_Date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  Created_By: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  Updated_By: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  Created_Date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  Updated_Date: {
    type: DataTypes.DATE,
    allowNull: true,
  }
}, {
  sequelize,
  modelName: 'Category',
  tableName: 'BPL_CATEGORY_MASTER',
  timestamps: false,
});

async function syncModel() {
  try {
    await sequelize.sync({ force: false }); // { force: false } will not drop the table if it already exists
    console.log('Ctegory table synchronized successfully!');
  } catch (error) {
    console.error('Error synchronizing the model:', error);  
  }
}

syncModel()

export default Category;
