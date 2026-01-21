import express from 'express';
import { getAllQuizes, getQuiz, createQuiz, deleteQuiz } from '../controllers/quizesController.js';

// NOTE: ALL OF THE NOTES REST API ENDPOINTS
const router = express.Router();

router.get('/', getAllQuizes);
router.get('/:id', getQuiz);
router.post('/:noteId', createQuiz);
router.delete('/:id', deleteQuiz);

export default router;
