import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import noteRoutes from './src/routes/note.js';
import codeurRoutes from './src/routes/codeur.js';
import podcastRoutes from './src/routes/podcast.js';
import programRoutes from './src/routes/program.js'



dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const corsOptions = {
  origin: "http://localhost:5000", // for vite application
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());

// API routes


 app.use("/notes", noteRoutes);
 app.use("/codeurs", codeurRoutes);

 app.use("/podcast", podcastRoutes);
 app.use("/podcasts",podcastRoutes);


 app.use("/programs", programRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
