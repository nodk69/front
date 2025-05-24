import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
  return (
    <div className="min-h-screen bg-pink-50 flex flex-col font-sans">
      <Header />

      {/* Main Content */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-white rounded-2xl border-2 border-pink-100 shadow-lg px-5 py-6 sm:px-6">
              <Outlet />
            </div>
          </div>
        </div>
      </main>

      {/* Cute Footer */}
      <footer className="bg-pink-100 border-t border-pink-200">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-pink-500">
            &copy; {new Date().getFullYear()} Love Complaint Diary 💕 — He had it coming 😘
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
