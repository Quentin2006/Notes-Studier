export interface Note {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateNoteData {
  title: string;
  content: string;
}

export interface UpdateNoteData {
  title?: string;
  content?: string;
}

export interface Question {
  question: string;
  answers: string[];
  correctAnswer: number;
}

export interface Quiz {
  _id: string;
  title: string;
  subject: string;
  questions: Question[];
  createdAt: string;
  updatedAt: string;
}
