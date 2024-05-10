import express from "express";
import {
  createCodeur,
  getNotes
} from "../controller/codeur.js";

const router = express.Router();
/* READ */
router.get('/:id/notes', getNotes)
router.post('/', createCodeur)


export default router;