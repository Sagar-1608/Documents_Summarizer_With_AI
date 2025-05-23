import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { errorHandler } from "./middlewares/error.moddleware.js"
import path from "path"
import { fileURLToPath } from 'url';


const app = express()

// cross origin resorce management 
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))


// required middlewares 
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

// set the uploade forder as public 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



// importing the all route 
import userRouter from './routes/authRoute.js'
import privateRouter from './routes/privateRoute.js'
import publicRouter from "./routes/publicRoute.js"

//routes declaration
app.use("/api/v1/auth", userRouter)
app.use("/api/v1/private", privateRouter)
app.use("/api/v1/public", publicRouter)

app.use(errorHandler)
export {app}
