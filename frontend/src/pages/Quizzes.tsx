import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuizzes } from '../hooks/useQuizzes';
import { QuizCard } from '../components/QuizCard';
import { QuizDeleteModal } from '../components/QuizDeleteModal';
import type { Quiz } from '../types';

export const Quizzes = () => {
  const navigate = useNavigate();
  const { quizzes, isLoading, error, deleteQuiz, isDeleting } = useQuizzes();
  
  const [deletingQuiz, setDeletingQuiz] = useState<Quiz | undefined>();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredQuizzes = quizzes.filter(quiz => 
    quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    quiz.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteQuiz = async () => {
    if (deletingQuiz) {
      try {
        console.log('Deleting quiz:', deletingQuiz._id);
        await deleteQuiz(deletingQuiz._id);
        console.log('Quiz deleted successfully');
        setDeletingQuiz(undefined);
      } catch (error) {
        console.error('Failed to delete quiz:', error);
      }
    }
  };

  const handleTakeQuiz = (quiz: Quiz) => {
    navigate(`/quizzes/${quiz._id}`);
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
          <p className="text-white/70">Failed to load quizzes</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white">
        <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Quizzes
        </span>
      </h1>

      <div className="flex items-center">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search quizzes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="glass-input w-full px-4 py-3 rounded-xl text-white placeholder-white/40"
          />
        </div>
      </div>

      {filteredQuizzes.length === 0 ? (
        <div className="text-center py-20">
          <div className="glass rounded-2xl p-12 max-w-md mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              {searchQuery ? 'No quizzes found' : 'No quizzes yet'}
            </h3>
            <p className="text-white/70 mb-6">
              {searchQuery 
                ? 'Try adjusting your search query' 
                : 'Generate one from your notes!'}
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuizzes.map((quiz) => (
            <QuizCard
              key={quiz._id}
              quiz={quiz}
              onTakeQuiz={handleTakeQuiz}
              onDelete={setDeletingQuiz}
            />
          ))}
        </div>
      )}

      <QuizDeleteModal
        isOpen={!!deletingQuiz}
        onClose={() => setDeletingQuiz(undefined)}
        onConfirm={handleDeleteQuiz}
        isDeleting={isDeleting}
        quizTitle={deletingQuiz?.title}
      />
    </div>
  );
};
