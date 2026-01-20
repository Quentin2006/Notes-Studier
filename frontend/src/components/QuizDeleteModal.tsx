interface QuizDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  isDeleting?: boolean;
  quizTitle?: string;
}

export const QuizDeleteModal = ({ isOpen, onClose, onConfirm, isDeleting, quizTitle }: QuizDeleteModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      <div className="glass-strong rounded-2xl p-8 w-full max-w-md relative shadow-2xl">
        <h2 className="text-2xl font-bold text-white mb-4">
          Delete Quiz
        </h2>
        
        <p className="text-white/70 mb-6">
          Are you sure you want to delete "{quizTitle}"? This action cannot be undone.
        </p>
        
        <div className="flex gap-4">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="glass-button flex-1 px-6 py-3 rounded-xl text-white font-medium"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 flex-1 px-6 py-3 rounded-xl text-white font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};
