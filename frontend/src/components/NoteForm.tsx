import { useState } from 'react';
import type { Note, CreateNoteData } from '../types';

interface NoteFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: CreateNoteData) => Promise<void>;
  note?: Note;
  isSaving?: boolean;
}

export const NoteForm = ({ isOpen, onClose, onSave, note, isSaving }: NoteFormProps) => {
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    
    await onSave({ title, content });
    setTitle('');
    setContent('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      <div className="glass-strong rounded-2xl p-8 w-full max-w-lg relative z-10 shadow-2xl">
        <h2 className="text-2xl font-bold text-white mb-6">
          {note ? 'Edit Note' : 'Create New Note'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="glass-input w-full px-4 py-3 rounded-xl text-white placeholder-white/40"
              placeholder="Enter note title..."
              required
            />
          </div>
          
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="glass-input w-full px-4 py-3 rounded-xl text-white placeholder-white/40 min-h-[200px] resize-y"
              placeholder="Write your note content..."
              required
            />
          </div>
          
          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="glass-button flex-1 px-6 py-3 rounded-xl text-white font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 flex-1 px-6 py-3 rounded-xl text-white font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? 'Saving...' : 'Save Note'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
