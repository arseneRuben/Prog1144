import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 6000;

const corsOptions = {
  origin: "http://localhost:8080", // for vite application
  optionsSuccessStatus: 200,
};

//middleware
app.use(cors(corsOptions));
app.use(express.json());

// api routes
// app.use("/notes", notesRoute);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});