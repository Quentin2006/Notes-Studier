interface QuizLoaderProps {
  noteTitle: string;
}

export const QuizLoader = ({ noteTitle }: QuizLoaderProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      
      <div className="glass-strong rounded-2xl p-8 w-full max-w-md relative shadow-2xl">
        <div className="flex flex-col items-center text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mb-6"></div>
          
          <h2 className="text-2xl font-bold text-white mb-2">
            Generating Quiz
          </h2>
          
          <p className="text-white/70 mb-2">
            From note: "{noteTitle}"
          </p>
          
          <p className="text-sm text-white/50">
            AI is creating questions...
          </p>
        </div>
      </div>
    </div>
  );
};
