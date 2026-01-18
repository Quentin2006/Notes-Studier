import express from 'express';
import { getAllQuizes, createQuiz, updateQuiz, deleteQuiz } from '../controllers/quizesController.js';

// NOTE: ALL OF THE NOTES REST API ENDPOINTS
const router = express.Router();

router.get('/', getAllQuizes);
router.post('/', createQuiz);
router.put('/:id', updateQuiz);
router.delete('/', deleteQuiz);

export default router;
