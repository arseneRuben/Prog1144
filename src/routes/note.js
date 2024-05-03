import express from "express";
import {
  getNotes,
  getNote,
  createNote
 
} from "../controller/note.js";

const router = express.Router();

router.get('/', getNotes)
router.get('/:id', getNote)
router.post('/', createNote)

export default router;