import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import noteRoutes from './src/routes/note.js'
import codeurRoutes from './src/routes/codeur.js'
import podcastRoutes from './src/routes/podcast.js'



dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

const corsOptions = {
  origin: "http://localhost:4000", // for vite application
  optionsSuccessStatus: 200,
};


app.use(cors(corsOptions));

app.use(express.json());


// api routes
 app.use("/notes", noteRoutes);
 app.use("/codeurs", codeurRoutes);
 app.use("/podcast", podcastRoutes);
 app.use("/podcasts", podcastRoutes);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});