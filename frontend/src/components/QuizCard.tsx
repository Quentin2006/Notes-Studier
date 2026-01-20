import type { Quiz } from '../types';

interface QuizCardProps {
  quiz: Quiz;
  onTakeQuiz: (quiz: Quiz) => void;
  onDelete: (quiz: Quiz) => void;
}

export const QuizCard = ({ quiz, onTakeQuiz, onDelete }: QuizCardProps) => {
  const date = new Date(quiz.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="glass rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl group">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-white group-hover:text-purple-300 transition-colors mb-1">
            {quiz.title}
          </h3>
          <p className="text-white/60 text-sm">
            {quiz.subject}
          </p>
        </div>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onDelete(quiz)}
            className="glass-button px-3 py-1 rounded-lg text-sm text-red-300 hover:text-red-200"
          >
            Delete
          </button>
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-4">
        <span className="text-sm text-white/70">
          {quiz.questions.length} question{quiz.questions.length !== 1 ? 's' : ''}
        </span>
        <span className="text-xs text-white/40">
          Created {date}
        </span>
      </div>
      
      <button
        onClick={() => onTakeQuiz(quiz)}
        className="w-full mt-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-6 py-3 rounded-xl text-white font-medium transition-all duration-300 active:scale-95"
      >
        Take Quiz
      </button>
    </div>
  );
};
