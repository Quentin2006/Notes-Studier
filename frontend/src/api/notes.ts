import axios from 'axios';
import type { Note, CreateNoteData, UpdateNoteData } from '../types';

const api = axios.create({
  baseURL: '/api/notes',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const notesApi = {
  getAllNotes: async (): Promise<Note[]> => {
    const response = await api.get('/');
    return response.data;
  },

  getNote: async (id: string): Promise<Note> => {
    const response = await api.get(`/${id}`);
    return response.data;
  },

  createNote: async (data: CreateNoteData): Promise<Note> => {
    const response = await api.post('/', data);
    return response.data;
  },

  updateNote: async (id: string, data: UpdateNoteData): Promise<Note> => {
    const response = await api.put(`/${id}`, data);
    return response.data;
  },

  deleteNote: async (id: string): Promise<Note> => {
    const response = await api.delete(`/${id}`);
    return response.data;
  },
};
