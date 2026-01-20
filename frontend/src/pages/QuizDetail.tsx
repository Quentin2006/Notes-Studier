import { useNavigate, useParams } from 'react-router-dom';
import { useQuiz } from '../hooks/useQuizzes';
import { QuizTaker } from '../components/QuizTaker';

export const QuizDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: quiz, isLoading, error } = useQuiz(id || '');

  if (isLoading || !quiz) {
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
          <p className="text-white/70">Failed to load quiz</p>
          <button
            onClick={() => navigate('/quizzes')}
            className="mt-4 glass-button px-6 py-3 rounded-xl text-white font-medium"
          >
            Back to Quizzes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <button
        onClick={() => navigate('/quizzes')}
        className="glass-button mb-8 px-6 py-3 rounded-xl text-white font-medium"
      >
        ← Back to Quizzes
      </button>
      
      <QuizTaker quiz={quiz} onComplete={() => {}} />
    </div>
  );
};
