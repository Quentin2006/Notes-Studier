import express from 'express';
import { getAllNotes, createNote, updateNote, deleteNote } from '../controllers/notesController.js';

// NOTE: ALL OF THE NOTES REST API ENDPOINTS
const router = express.Router();

router.get('/', getAllNotes);
router.post('/', createNote);
router.put('/:id', updateNote);
router.delete('/', deleteNote);

export default router;
