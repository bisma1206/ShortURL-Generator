import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectdb from "./config/mongodb.js"; 
import URLrouter from "./routes/UrlRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5003; 

connectdb();

app.use(express.json());
app.use(cors());

app.use('/api', URLrouter);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
