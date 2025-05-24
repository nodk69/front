import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-rose-50 flex flex-col font-sans">
      <Header />

      {/* Main Content */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
          <div className="px-2 sm:px-4 py-4 sm:py-6">
            <div className="bg-white rounded-xl sm:rounded-2xl border-2 border-pink-100 shadow-sm sm:shadow-lg px-4 py-5 sm:px-6">
              <Outlet />
            </div>
          </div>
        </div>
      </main>

      {/* Responsive Footer */}
      <footer className="bg-pink-100 border-t border-pink-200">
        <div className="max-w-7xl mx-auto py-3 sm:py-4 px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs sm:text-sm text-pink-500">
            &copy; {new Date().getFullYear()} Love Complaint Diary 💕 — 
            <span className="hidden xs:inline"> He had it coming</span> 😘
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;