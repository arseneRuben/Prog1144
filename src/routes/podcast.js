import express from "express";
import {
  getPodcasts,
  getPodcast,
  createPodcast,
  updatePodcast,
  deletePodcast
} from "../controller/podcast.js";

const router = express.Router();

/* READ */
router.get('/', getPodcasts); 
router.get('/:id', getPodcast); 
/* CREATE */
router.post('/', createPodcast);
/* UPDATE */
router.patch('/:id', updatePodcast);
/* DELETE */
router.delete('/:id', deletePodcast);

export default router;
