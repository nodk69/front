import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-pink-100 shadow-md border-b border-pink-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-pink-600">💖</span>
            <h1 className="text-xl font-bold text-pink-700 tracking-wide">
              Love Complaint Diary
            </h1>
          </Link>

          {/* Navigation */}
          <nav className="hidden sm:flex space-x-6">
            <Link
              to="/grievances/all"
              className="text-pink-700 hover:bg-pink-200 hover:text-red-500 transition px-4 py-2 rounded-full text-base font-semibold shadow-sm"
            >
              All Complaints 💌
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
