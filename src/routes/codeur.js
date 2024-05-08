import express from "express";
import {
  createCodeur,
} from "../controller/codeur.js";

const router = express.Router();
/* READ */
router.post('/', createCodeur)


export default router;