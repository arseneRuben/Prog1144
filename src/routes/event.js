import express from "express";
import {
  getEvents,
  getEvent,
  createEvent,
  deleteEvent,
  updateEvent
} from "../controller/event.js";

const router = express.Router();

/* READ */
router.get('/', getEvents);
router.get('/:id', getEvent);
/* CREATE */
router.post('/', createEvent);
/* UPDATE */
router.patch('/:id', updateEvent);
/* DELETE */
router.delete('/:id', deleteEvent);

export default router;
