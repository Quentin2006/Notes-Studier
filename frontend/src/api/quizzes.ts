import axios from 'axios';
import type { Quiz } from '../types';

const api = axios.create({
  baseURL: '/api/quizes',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const quizzesApi = {
  getAllQuizzes: async (): Promise<Quiz[]> => {
    const response = await api.get('/');
    return response.data;
  },

  getQuiz: async (id: string): Promise<Quiz> => {
    const response = await api.get(`/${id}`);
    return response.data;
  },

  createQuiz: async (noteId: string): Promise<Quiz> => {
    const response = await api.post(`/${noteId}`);
    return response.data;
  },

  deleteQuiz: async (id: string): Promise<Quiz> => {
    const response = await api.delete(`/${id}`);
    return response.data;
  },
};
