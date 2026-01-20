import express from 'express';
import { getAllQuizes, getQuiz, createQuiz, updateQuiz, deleteQuiz } from '../controllers/quizesController.js';

// NOTE: ALL OF THE NOTES REST API ENDPOINTS
const router = express.Router();

router.get('/', getAllQuizes);
router.get('/:id', getQuiz);
router.post('/:noteId', createQuiz);
router.put('/:id', updateQuiz);
router.delete('/', deleteQuiz);

export default router;
