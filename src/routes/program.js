import express from "express";
import {
  getPrograms, 
  getProgram,
  createProgram,
  updateProgram,
  deleteProgram
} from "../controller/program.js";

const router = express.Router();
/* READ */
router.get('/', getPrograms)
router.get('/:id', getProgram)
/* CREATE */
router.post('/', createProgram)
/* UPDATE */
router.patch('/:id',updateProgram)
/* DELETE */
router.delete('/:id',deleteProgram)
export default router;