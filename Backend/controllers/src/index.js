
import sequelize from './config/db.js' 
import {app} from './app.js'
import dotenv from 'dotenv';
dotenv.config();

// with data base 
async function startServer() {
    try {
        await sequelize.authenticate();
        // console.log('\n🎉🎉🎉 Congratulations! Your Database Connected successfully!🎉🎉🎉');
  

        // Optional: sync models
        // await sequelize.sync(); 
        // console.log('✅ All models synchronized.');

        app.listen(process.env.PORT || 4000, () => {
            console.log(`⚙️  Server running at port: ${process.env.PORT}`);
        });
    } catch (error) {
        // console.log(error)
        console.error('❌ Failed to connect to database:', error.message);
        process.exit(1);
    }
}

// async function startServer() {
//     try {
//         app.listen(process.env.PORT || 4000, () => {
//             console.log(`⚙️  Server running at port: ${process.env.PORT}`);
//         });
//     } catch (error) {
//         console.error('❌ Failed to connect to database:', error.message);
//         process.exit(1);
//     }
// }

startServer();


