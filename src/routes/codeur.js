import express from "express";
import {
  createCodeur,
  getNotes, 
  deleteNotes
} from "../controller/codeur.js";

const router = express.Router();
/* READ */
router.get('/:id/notes', getNotes)
/* CREATE */
router.post('/', createCodeur)
/* DELETE */
router.delete('/:id/notes', deleteNotes)
export default router;