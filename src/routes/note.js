import express from "express";
import {
  getNotes,
  getNote,
  createNote,
  deleteNote
 
} from "../controller/note.js";

const router = express.Router();

router.get('/', getNotes)
router.get('/:id', getNote)
router.post('/', createNote)
router.delete('/:id', deleteNote)

export default router;