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
<<<<<<< HEAD
router.get('/', getPodcasts); 
router.get('/:id', getPodcast); 
=======
router.get('/podcasts', getPodcasts);
router.get('/:id', getPodcast);
>>>>>>> c73393ec9817afeaafdf1262f6ed89772beff0af
/* CREATE */
router.post('/', createPodcast);
/* UPDATE */
router.patch('/:id', updatePodcast);
/* DELETE */
router.delete('/:id', deletePodcast);

export default router;
