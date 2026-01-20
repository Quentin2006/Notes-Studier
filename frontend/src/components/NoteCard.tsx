import type { Note } from '../types';

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (note: Note) => void;
  onGenerateQuiz: (noteId: string) => void;
  isGenerating?: boolean;
}

export const NoteCard = ({ note, onEdit, onDelete, onGenerateQuiz, isGenerating }: NoteCardProps) => {
  const date = new Date(note.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const canGenerateQuiz = note.content.length >= 50;

  return (
    <div className="glass rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl group">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-white group-hover:text-purple-300 transition-colors">
          {note.title}
        </h3>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onGenerateQuiz(note._id)}
            disabled={!canGenerateQuiz || isGenerating}
            title={!canGenerateQuiz ? 'Need at least 50 characters' : ''}
            className={`glass-button px-3 py-1 rounded-lg text-sm ${
              !canGenerateQuiz ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isGenerating ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
              'Generate Quiz'
            )}
          </button>
          <button
            onClick={() => onEdit(note)}
            className="glass-button px-3 py-1 rounded-lg text-sm"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(note)}
            className="glass-button px-3 py-1 rounded-lg text-sm text-red-300 hover:text-red-200"
          >
            Delete
          </button>
        </div>
      </div>
      
      <p className="text-white/70 text-sm line-clamp-4 mb-4">
        {note.content}
      </p>
      
      <div className="flex items-center justify-between">
        <span className="text-xs text-white/40">
          Created {date}
        </span>
        <div className="w-2 h-2 rounded-full bg-purple-400"></div>
      </div>
    </div>
  );
};
