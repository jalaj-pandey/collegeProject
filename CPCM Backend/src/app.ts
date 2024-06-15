import express from "express";
import { connectDB } from "./utils/features.js";
import { errorMiddleware } from "./middlewares/error.js";
import NodeCache from "node-cache"
import { config } from "dotenv";
import morgan from "morgan";
import cors from "cors";

//Importing Routes
import userRoute from "./routes/user.js"
import jobRoute from "./routes/jobs.js"
import applicationRoute from "./routes/application.js"
import dashboardRoute from "./routes/stats.js"

config({
    path: "./.env",
})

const port = process.env.PORT || 3000;
const app = express();
const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017";

app.use(express.json());
app.use(morgan("dev"))
app.use(cors())

connectDB(mongoURI);

export const myCache = new NodeCache();

app.use("/api/v1/user", userRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/apply", applicationRoute);
app.use("/api/v1/dashboard", dashboardRoute);

app.get("/", (req, res) => {
    res.send("This is working");
})

app.use('/uploads', express.static("uploads"))


app.use(errorMiddleware)

app.listen(port, ()=>{
    console.log(`listening on http://localhost/${port}`)
})