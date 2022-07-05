import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import dbConnection from "./dbConnection/db";
import Routes from "./routes/routes";


const app = express();

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.CLIENT_URL }));

//Routes
app.use("/", Routes);


//Database
const dbUrl = process.env.DATABASE_URL;
dbConnection(dbUrl);

const port = process.env.PORT || 8001;
app.listen(port, () => console.log(`Server Listening on port:${port}`));
