import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotes } from '../hooks/useNotes';
import { useQuizzes } from '../hooks/useQuizzes';
import { useToast } from '../components/useToast';
import { NoteCard } from '../components/NoteCard';
import { NoteForm } from '../components/NoteForm';
import { DeleteModal } from '../components/DeleteModal';
import { QuizLoader } from '../components/QuizLoader';
import type { Note } from '../types';

export const Home = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { notes, isLoading, error, createNote, updateNote, deleteNote, isCreating, isUpdating, isDeleting } = useNotes();
  const { createQuiz } = useQuizzes();
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | undefined>();
  const [deletingNote, setDeletingNote] = useState<Note | undefined>();
  const [generatingQuizNoteId, setGeneratingQuizNoteId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateNote = async (data: { title: string; content: string }) => {
    await createNote(data);
  };

  const handleEditNote = async (data: { title: string; content: string }) => {
    if (editingNote) {
      await updateNote({ id: editingNote._id, data });
      setEditingNote(undefined);
    }
  };

  const handleDeleteNote = async () => {
    if (deletingNote) {
      await deleteNote(deletingNote._id);
      setDeletingNote(undefined);
    }
  };

  const handleGenerateQuiz = async (noteId: string) => {
    const note = notes.find(n => n._id === noteId);
    if (!note) {
      console.error('Quiz generation failed: Note not found', noteId);
      return;
    }

    setGeneratingQuizNoteId(noteId);
    
    try {
      console.log('Generating quiz for note:', note.title);
      const quiz = await createQuiz(noteId);
      console.log('Quiz generated successfully:', quiz);
      
      if (!quiz || !quiz._id) {
        console.error('Invalid quiz response:', quiz);
        throw new Error('Invalid quiz response from server');
      }
      
      if (!quiz.questions || !Array.isArray(quiz.questions) || quiz.questions.length === 0) {
        console.error('Quiz has no valid questions:', quiz);
        throw new Error('Quiz generated with no questions');
      }
      
      showToast('Quiz generated!', 'success');
      navigate(`/quizzes/${quiz._id}`);
      setGeneratingQuizNoteId(null);
    } catch (error) {
      console.error('Quiz generation failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to generate quiz';
      showToast(errorMessage, 'error');
      setGeneratingQuizNoteId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="glass rounded-2xl p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="glass-strong rounded-2xl p-8 text-center">
          <h2 className="text-xl font-bold text-white mb-2">Error</h2>
          <p className="text-white/70">Failed to load notes</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex-1 w-full">
          <input
            type="text"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="glass-input w-full px-4 py-3 rounded-xl text-white placeholder-white/40"
          />
        </div>
        <button
          onClick={() => setIsFormOpen(true)}
          className="glass-button bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-6 py-3 rounded-xl text-white font-medium transition-all duration-300 whitespace-nowrap"
        >
          + New Note
        </button>
      </div>

      {filteredNotes.length === 0 ? (
        <div className="text-center py-20">
          <div className="glass rounded-2xl p-12 max-w-md mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              {searchQuery ? 'No notes found' : 'No notes yet'}
            </h3>
            <p className="text-white/70 mb-6">
              {searchQuery 
                ? 'Try adjusting your search query' 
                : 'Create your first note to get started'}
            </p>
            {!searchQuery && (
              <button
                onClick={() => setIsFormOpen(true)}
                className="glass-button bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-6 py-3 rounded-xl text-white font-medium transition-all duration-300"
              >
                Create Note
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.map((note) => (
            <NoteCard
              key={note._id}
              note={note}
              onEdit={setEditingNote}
              onDelete={setDeletingNote}
              onGenerateQuiz={handleGenerateQuiz}
              isGenerating={generatingQuizNoteId === note._id}
            />
          ))}
        </div>
      )}

      <NoteForm
        key={editingNote?._id || 'new'}
        isOpen={isFormOpen || !!editingNote}
        onClose={() => {
          setIsFormOpen(false);
          setEditingNote(undefined);
        }}
        onSave={editingNote ? handleEditNote : handleCreateNote}
        note={editingNote}
        isSaving={isCreating || isUpdating}
      />

      <DeleteModal
        isOpen={!!deletingNote}
        onClose={() => setDeletingNote(undefined)}
        onConfirm={handleDeleteNote}
        isDeleting={isDeleting}
        noteTitle={deletingNote?.title}
      />

      {generatingQuizNoteId && (
        <QuizLoader noteTitle={notes.find(n => n._id === generatingQuizNoteId)?.title || ''} />
      )}
    </div>
  );
};
