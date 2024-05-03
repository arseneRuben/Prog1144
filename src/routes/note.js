import express from "express";
import {
  getNotes,
  getNote
 
} from "../controller/note.js";

const router = express.Router();

router.get('/', getNotes)
router.get('/:id', getNote)

export default router;