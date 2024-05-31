import express from "express";
import {
  createCodeur,
  getNotes, 
  deleteNotes,
  deleteCodeur
} from "../controller/codeur.js";

const router = express.Router();
/* READ */
router.get('/:id/notes', getNotes)
/* CREATE */
router.post('/', createCodeur)
/* DELETE */
router.delete('/:id/notes', deleteNotes)
router.delete('/:id', deleteCodeur)
export default router;
