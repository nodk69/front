import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaHeart } from 'react-icons/fa';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-pink-100 shadow-md border-b border-pink-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-pink-600">
              <FaHeart className="h-6 w-6" />
            </span>
            <h1 className="text-xl font-bold text-pink-700 tracking-wide hidden sm:block">
              Love Complaint Diary
            </h1>
            <h1 className="text-xl font-bold text-pink-700 tracking-wide sm:hidden">
              Coconut dairy
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden sm:flex space-x-4">
            <Link
              to="/grievances/all"
              className="text-pink-700 hover:bg-pink-200 hover:text-pink-600 transition px-3 py-2 rounded-full text-sm font-semibold"
            >
              All Complaints 💌
            </Link>
            <Link
              to="/grievances/new"
              className="bg-pink-500 text-white hover:bg-pink-600 transition px-4 py-2 rounded-full text-sm font-semibold shadow-sm"
            >
              New Complaint
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="sm:hidden text-pink-700 hover:text-pink-600 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <FaTimes className="h-6 w-6" />
            ) : (
              <FaBars className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="sm:hidden bg-pink-50 border-t border-pink-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/grievances/all"
                className="block px-3 py-2 rounded-md text-base font-medium text-pink-700 hover:bg-pink-200 hover:text-pink-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                All Complaints 💌
              </Link>
              <Link
                to="/grievances/new"
                className="block px-3 py-2 rounded-md text-base font-medium bg-pink-500 text-white hover:bg-pink-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                New Complaint
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;