import { useNavigate, useParams } from 'react-router-dom';
import { useQuiz } from '../hooks/useQuizzes';
import { QuizTaker } from '../components/QuizTaker';
import type { Quiz } from '../types';

const isValidQuiz = (quiz: Quiz | undefined): quiz is Quiz => {
  return !!quiz && 
         !!quiz._id && 
         !!quiz.questions && 
         Array.isArray(quiz.questions) && 
         quiz.questions.length > 0 &&
         quiz.questions.every(q => 
           !!q.question && 
           !!q.answers && 
           Array.isArray(q.answers) && 
           q.answers.length > 0 &&
           typeof q.correctAnswer === 'number' &&
           q.correctAnswer >= 0 && 
           q.correctAnswer < q.answers.length
         );
};

export const QuizDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: quiz, isLoading, error } = useQuiz(id || '');

  console.log('QuizDetail state:', { id, isLoading, error, quiz });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="glass rounded-2xl p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      </div>
    );
  }

  if (error || !quiz) {
    console.error('QuizDetail error:', error, 'Quiz:', quiz);
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="glass-strong rounded-2xl p-8 text-center">
          <h2 className="text-xl font-bold text-white mb-2">Error</h2>
          <p className="text-white/70">
            {error ? 'Failed to load quiz' : 'Quiz not found'}
          </p>
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

  if (!isValidQuiz(quiz)) {
    console.error('Invalid quiz structure:', quiz);
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="glass-strong rounded-2xl p-8 text-center">
          <h2 className="text-xl font-bold text-white mb-2">Invalid Quiz</h2>
          <p className="text-white/70">
            This quiz has invalid data. Please generate a new quiz.
          </p>
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
      
      <QuizTaker quiz={quiz} onComplete={(score) => console.log('Quiz completed with score:', score)} />
    </div>
  );
};
