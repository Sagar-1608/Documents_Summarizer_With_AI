// import mongoose, {Schema} from "mongoose";
// import jwt from "jsonwebtoken"
// import bcrypt from "bcrypt"
// // Emp_Id (PK)	Number
// // Emp_Name	VARCHAR2(50)
// // Email_Id	VARCHAR2(50)
// // User_Id	VARCHAR2(50)
// // Password	VARCHAR2(50)
// // Start_Date	Date
// // End_Date	Date
// const userSchema = new Schema(
//     {
//         username: {
//             type: String,
//             required: true,
//             unique: true,
//             lowercase: true,
//             trim: true, 
//             index: true
//         },
//         email: {
//             type: String,
//             required: true,
//             unique: true,
//             lowecase: true,
//             trim: true, 
//         },
//         fullName: {
//             type: String,
//             required: true,
//             trim: true, 
//             index: true
//         },
//         avatar: {
//             type: String, // cloudinary url
//             required: true,
//         },
//         coverImage: {
//             type: String, // cloudinary url
//         },
//         watchHistory: [
//             {
//                 type: Schema.Types.ObjectId,
//                 ref: "Video"
//             }
//         ],
//         password: {
//             type: String,
//             required: [true, 'Password is required']
//         },
//         refreshToken: {
//             type: String
//         }

//     },
//     {
//         timestamps: true
//     }
// )

// userSchema.pre("save", async function (next) {
//     if(!this.isModified("password")) return next();

//     this.password = await bcrypt.hash(this.password, 10)
//     next()
// })

// userSchema.methods.isPasswordCorrect = async function(password){
//     return await bcrypt.compare(password, this.password)
// }

// userSchema.methods.generateAccessToken = function(){
//     return jwt.sign(
//         {
//             _id: this._id,
//             email: this.email,
//             username: this.username,
//             fullName: this.fullName
//         },
//         process.env.ACCESS_TOKEN_SECRET,
//         {
//             expiresIn: process.env.ACCESS_TOKEN_EXPIRY
//         }
//     )
// }
// userSchema.methods.generateRefreshToken = function(){
//     return jwt.sign(
//         {
//             _id: this._id,
            
//         },
//         process.env.REFRESH_TOKEN_SECRET,
//         {
//             expiresIn: process.env.REFRESH_TOKEN_EXPIRY
//         }
//     )
// }

// export const User = mongoose.model("User", userSchema)


import { DataTypes, DATE, Model } from 'sequelize';
import sequelize from '../config/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

class Admin extends Model {
    async isPasswordCorrect(enteredPassword) {
        return await bcrypt.compare(enteredPassword, this.Password);
    }

    generateAccessToken() {
        return jwt.sign(
            {   Id :this.Id,
                Emp_Id: this.Emp_Id,
                Email_Id: this.Email_Id,
                User_Id: this.User_Id,
                Emp_Name: this.Emp_Name
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRY
            }
        );
    }

    generateRefreshToken() {
        return jwt.sign(
            {
                Id :this.Id
            },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: process.env.REFRESH_TOKEN_EXPIRY
            }
        );
    }
}

Admin.init({
    Id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false

    },
    Emp_Id: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique:true
    },
    Emp_Name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    Email_Id: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    User_Id: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    Password: {
        type: DataTypes.STRING(100),
        allowNull: false
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
    Refresh_Token:{
    type:DataTypes.STRING(1000),
    allowNull:true
    },
    Token: {
        type: DataTypes.STRING,
        allowNull: true
      },
      Reset_Password_Expires: {
        type: DataTypes.DATE,
        allowNull: true
      }
}, {
    sequelize,
    modelName: 'Admin',                     // <-- Model name
    tableName: 'BPL_ADMIN_MASTER',         // <-- Oracle table name
    timestamps: false
});

// Hash password before creating
Admin.beforeCreate(async (admin, options) => {
    if (admin.Password) {
        admin.Password = await bcrypt.hash(admin.Password, 10);
    }
});

// Hash password before updating if changed
Admin.beforeUpdate(async (admin, options) => {
    if (admin.changed('Password')) {
        admin.Password = await bcrypt.hash(admin.Password, 10);
    }
});


async function syncModel() {
  try {
    await sequelize.sync({ force: false }); // { force: false } will not drop the table if it already exists
    console.log('Admin table synchronized successfully!');
  } catch (error) {
    console.error('Error synchronizing the model:', error);
  }
}

syncModel()
export default Admin;


  
