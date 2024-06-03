import express from 'express';
import { searchAll } from '../controller/search.js';

const router = express.Router();

router.get('/', searchAll);

export default router;
