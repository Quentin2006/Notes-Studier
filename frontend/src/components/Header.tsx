export const Header = () => {
  return (
    <header className="glass sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-6 py-4">
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
      </div>
    </header>
  );
};
