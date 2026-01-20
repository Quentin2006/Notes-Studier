import { Link, useLocation } from 'react-router-dom';

export const Header = () => {
  const location = useLocation();
  const isNotesPage = location.pathname === '/';
  const isQuizzesPage = location.pathname === '/quizzes' || location.pathname.startsWith('/quizzes/');

  return (
    <header className="glass sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Notes Studier
              </span>
            </h1>
            <p className="text-sm text-white/60 hidden sm:block">
              Transform your handwritten notes
            </p>
          </div>
          
          <div className="flex gap-2">
            <Link
              to="/"
              className={`px-6 py-2 rounded-xl font-medium transition-all duration-300 ${
                isNotesPage
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : 'glass text-white/70 hover:text-white hover:bg-white/20'
              }`}
            >
              Notes
            </Link>
            <Link
              to="/quizzes"
              className={`px-6 py-2 rounded-xl font-medium transition-all duration-300 ${
                isQuizzesPage
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : 'glass text-white/70 hover:text-white hover:bg-white/20'
              }`}
            >
              Quizzes
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
