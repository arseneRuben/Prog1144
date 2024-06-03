import express from "express";
import {
  getAnimators,
  getAnimator,
  createAnimator,
  deleteAnimator,
  updateAnimator
} from "../controller/animator.js";

const router = express.Router();

/* READ */
router.get('/', getAnimators);
router.get('/:id', getAnimator);
/* CREATE */
router.post('/', createAnimator);
/* UPDATE */
router.patch('/:id', updateAnimator);
/* DELETE */
router.delete('/:id', deleteAnimator);

export default router;
