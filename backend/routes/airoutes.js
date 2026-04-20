import express from 'express';
import { extractNutrition } from '../controllers/aicontroller.js';

const router = express.Router();

router.post('/extract-nutrition', extractNutrition);

export default router;