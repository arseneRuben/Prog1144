import express from "express";
import {
  getNotes,
  getNote,
  createNote,
  deleteNote,
  updateNote,
  getCodeur
} from "../controller/note.js";

const router = express.Router();
/* READ */
router.get('/:id/codeur', getCodeur)
router.get('/', getNotes)
router.get('/:id', getNote)
/* CREATE */
router.post('/', createNote)
/* UPDATE */
router.patch('/:id', updateNote)
/* DELETE */
router.delete('/:id', deleteNote)

export default router;