import { useState } from 'react';
import type { Quiz } from '../types';

interface QuizTakerProps {
  quiz: Quiz;
  onComplete: (score: number) => void;
}

export const QuizTaker = ({ quiz, onComplete }: QuizTakerProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>(new Array(quiz.questions.length).fill(-1));
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showCorrect, setShowCorrect] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowCorrect(true);
    
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setUserAnswers(newAnswers);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      const correctAnswers = userAnswers.reduce((count, answer, index) => {
        if (answer === quiz.questions[index].correctAnswer) {
          return count + 1;
        }
        return count;
      }, 0);
      onComplete(correctAnswers);
      setIsComplete(true);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowCorrect(false);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setSelectedAnswer(userAnswers[currentQuestionIndex - 1]);
      setShowCorrect(true);
    }
  };

  const handleSkip = () => {
    if (isLastQuestion) {
      const correctAnswers = userAnswers.reduce((count, answer, index) => {
        if (answer === quiz.questions[index].correctAnswer) {
          return count + 1;
        }
        return count;
      }, 0);
      onComplete(correctAnswers);
      setIsComplete(true);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowCorrect(false);
    }
  };

  const handleTakeAgain = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers(new Array(quiz.questions.length).fill(-1));
    setSelectedAnswer(null);
    setShowCorrect(false);
    setIsComplete(false);
  };

  if (isComplete) {
    const correctAnswers = userAnswers.reduce((count, answer, index) => {
      if (answer === quiz.questions[index].correctAnswer) {
        return count + 1;
      }
      return count;
    }, 0);
    const percentage = Math.round((correctAnswers / quiz.questions.length) * 100);

    return (
      <div className="glass-strong rounded-2xl p-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Quiz Complete!
        </h2>
        <div className="bg-white/10 rounded-xl p-6 mb-6">
          <p className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            {correctAnswers}/{quiz.questions.length}
          </p>
          <p className="text-white/70 text-lg">
            {percentage}% Correct
          </p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={handleTakeAgain}
            className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-6 py-3 rounded-xl text-white font-medium transition-all duration-300 active:scale-95"
          >
            Take Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-strong rounded-2xl p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">
          {quiz.title}
        </h2>
        <span className="text-sm text-white/60">
          Question {currentQuestionIndex + 1} of {quiz.questions.length}
        </span>
      </div>

      <div className="mb-8">
        <p className="text-lg text-white mb-6">
          {currentQuestion.question}
        </p>
        
        <div className="space-y-3">
          {currentQuestion.answers.map((answer, index) => {
            let buttonClass = 'glass-button w-full px-6 py-4 rounded-xl text-left text-white text-medium transition-all duration-300 ';
            
            if (showCorrect && selectedAnswer !== null) {
              if (index === currentQuestion.correctAnswer) {
                buttonClass += 'bg-green-500/40 border-green-500 text-green-100 ';
              } else if (index === selectedAnswer && selectedAnswer !== currentQuestion.correctAnswer) {
                buttonClass += 'bg-red-500/40 border-red-500 text-red-100 ';
              }
            }

            return (
              <button
                key={index}
                onClick={() => !showCorrect && handleAnswerSelect(index)}
                disabled={showCorrect}
                className={buttonClass.trim()}
              >
                {answer}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex justify-between gap-4">
        <button
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className="glass-button px-6 py-3 rounded-xl text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        
        <button
          onClick={handleSkip}
          className="glass-button px-6 py-3 rounded-xl text-white font-medium"
        >
          Skip
        </button>
        
        {showCorrect && (
          <button
            onClick={handleNext}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-6 py-3 rounded-xl text-white font-medium transition-all duration-300 active:scale-95"
          >
            {isLastQuestion ? 'Finish' : 'Next'}
          </button>
        )}
      </div>
    </div>
  );
};
