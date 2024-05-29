import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import noteRoutes from './src/routes/note.js'
import codeurRoutes from './src/routes/codeur.js'
import programRoutes from './src/routes/program.js'



dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
  origin: "http://localhost:8080", // for vite application
  optionsSuccessStatus: 200,
};

//middleware
app.use(cors(corsOptions));

app.use(express.json());


// api routes
 app.use("/notes", noteRoutes);
 app.use("/codeurs", codeurRoutes);
 app.use("/programs", programRoutes);
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});