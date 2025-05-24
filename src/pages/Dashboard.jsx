import { useState, useEffect } from 'react';
import { useGetAllGrievancesQuery, useGetGrievancesByStatusQuery } from '../api/grievancesApi';
import GrievanceCard from '../components/grievances/GrievanceCard';
import Loader from '../components/ui/Loader';
import Button from '../components/ui/Button';
import { Link, useNavigate } from 'react-router-dom';
import StatusBadge from '../components/grievances/StatusBadge';
import { HeartIcon, PlusIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [showWelcome, setShowWelcome] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  const {
    data: allGrievances = [],
    isLoading: isLoadingAll,
    isError: isErrorAll,
  } = useGetAllGrievancesQuery();

  const {
    data: pendingGrievances = [],
    isLoading: isLoadingPending,
    isError: isErrorPending,
  } = useGetGrievancesByStatusQuery('PENDING');

  const {
    data: resolvedGrievances = [],
    isLoading: isLoadingResolved,
    isError: isErrorResolved,
  } = useGetGrievancesByStatusQuery('RESOLVED');

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      const hideTimer = setTimeout(() => setShowWelcome(false), 300);
      return () => clearTimeout(hideTimer);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // Sort grievances by date (newest first)
  const sortedGrievances = [...allGrievances].sort((a, b) => 
    new Date(b.createdAt) - new Date(a.createdAt)
  );

  if (isLoadingAll || isLoadingPending || isLoadingResolved)
    return <Loader size="large" className="my-12" />;

  if (isErrorAll || isErrorPending || isErrorResolved)
    return (
      <div className="text-pink-600 text-center mt-12 p-4 bg-pink-100 rounded-xl border border-pink-200 max-w-md mx-auto">
        💔 Oopsie! Couldn't load your complaints. Try again, pookie?
      </div>
    );

  return (
    <div className="space-y-4 md:space-y-6 lg:space-y-8 bg-gradient-to-b from-pink-50 to-rose-50 min-h-screen p-3 sm:p-4 md:p-6">
      {/* Welcome Toast - Responsive version */}
      {showWelcome && (
        <div
          className={`fixed top-3 sm:top-4 md:top-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ease-in-out w-[95vw] max-w-md ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <div className="bg-gradient-to-br from-pink-100 to-rose-100 border-2 border-pink-300 rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 shadow-lg md:shadow-xl animate-bounce-light">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-pink-700 mb-1 sm:mb-2 flex items-center">
                  <HeartIcon className="h-4 sm:h-5 md:h-6 w-4 sm:w-5 md:w-6 mr-1 sm:mr-2 text-rose-500" />
                  Welcome, My Coconut! 👑
                </h2>
                <p className="text-xs sm:text-sm md:text-base text-pink-800 mb-2 sm:mb-3 md:mb-4 leading-relaxed">
                  💌 Welcome to your <span className="font-semibold text-rose-600">Heart's Sanctuary</span>, my Queen 👑✨<br />
                  Did I mess up again? 💔 Tell me everything, my love...<br />
                  This is your safe space to share what's in your heart 💖<br />
                  {!isMobile && (
                    <>
                      All those little things you keep inside 🤐<br />
                      The sighs you hide behind smiles 😔💕<br />
                      The words left unspoken 🤫📝
                    </>
                  )}
                  {isMobile && (
                    <>
                      Share what's in your heart 💞<br />
                      Every whisper, every sigh 💭
                    </>
                  )}
                  <br />
                  I promise to listen with all my heart 🥺👉👈<br />
                  Because your happiness is my everything 🌈💘
                </p>
              </div>
              <button
                onClick={() => setIsVisible(false)}
                className="text-pink-500 hover:text-rose-600 transition-colors p-0.5 sm:p-1"
              >
                ✕
              </button>
            </div>
            <div className="flex justify-center">
              <button
                onClick={() => {
                  setIsVisible(false);
                  setTimeout(() => setShowWelcome(false), 800);
                  navigate('/grievances/new');
                }}
                className="px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 text-xs sm:text-sm md:text-base bg-gradient-to-r from-pink-400 to-rose-400 text-white rounded-full hover:from-pink-500 hover:to-rose-500 transition-all shadow-md hover:shadow-pink-300 flex items-center"
              >
                {isMobile ? "Vent 💘" : "Start Venting 💘"}
                <ArrowRightIcon className="h-3 sm:h-4 w-3 sm:w-4 ml-1 sm:ml-2 animate-bounce-horizontal" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header with responsive adjustments */}
      <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-2 sm:gap-3 md:gap-4">
        <div className="animate-float">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-pink-700 flex items-center">
            <span className="bg-pink-100 p-1 sm:p-2 rounded-full mr-1 sm:mr-2 md:mr-3">👸</span>
            {isMobile ? "ARUNIMA's Log" : "ARUNIMA's Complaint Log to HUMZA"}
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-pink-500 mt-0.5 sm:mt-1">
            Tracking his offenses since {new Date().getFullYear()} 💅
          </p>
        </div>
        <Button 
          onClick={() => navigate('/grievances/new')}
          className="w-full xs:w-auto bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white rounded-full px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-3 shadow-md hover:shadow-pink-300 transform hover:scale-105 transition-all group mt-1 sm:mt-0"
          size={isMobile ? "small" : "medium"}
        >
          <PlusIcon className="h-3 sm:h-4 md:h-5 w-3 sm:w-4 md:w-5 mr-1 group-hover:rotate-90 transition-transform" />
          {isMobile ? 'New' : 'New Complaint'}
        </Button>
      </div>

      {/* Stats Cards - Responsive grid */}
      <div className="grid grid-cols-1 gap-2 sm:gap-3 md:gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white shadow-sm sm:shadow-md md:shadow-lg rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 border-2 border-pink-200 hover:border-pink-300 transition-all hover:scale-[1.02] group">
          <h3 className="text-sm sm:text-base md:text-lg font-medium text-pink-700 flex items-center">
            <span className="bg-pink-100 p-0.5 sm:p-1 rounded-full mr-1 sm:mr-2">📝</span>
            Total Complaints
          </h3>
          <div className="mt-1 sm:mt-2 md:mt-3 flex items-end">
            <p className="text-2xl sm:text-3xl md:text-5xl font-bold text-pink-600 mr-1 sm:mr-2">
              {allGrievances.length}
            </p>
            <span className="text-pink-400 mb-0.5 sm:mb-1 text-lg sm:text-xl md:text-2xl group-hover:animate-shake">😤</span>
          </div>
        </div>
        
        <div className="bg-white shadow-sm sm:shadow-md md:shadow-lg rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 border-2 border-yellow-200 hover:border-yellow-300 transition-all hover:scale-[1.02] group">
          <h3 className="text-sm sm:text-base md:text-lg font-medium text-yellow-700 flex items-center">
            <span className="bg-yellow-100 p-0.5 sm:p-1 rounded-full mr-1 sm:mr-2">⏳</span>
            Pending Apologies
          </h3>
          <div className="mt-1 sm:mt-2 md:mt-3 flex items-center">
            <p className="text-2xl sm:text-3xl md:text-5xl font-bold text-yellow-600 mr-1 sm:mr-2">
              {pendingGrievances.length}
            </p>
            <div className="flex items-center">
              <StatusBadge status="PENDING" size={isMobile ? 'sm' : 'md'} />
              <span className="ml-1 sm:ml-2 text-yellow-400 text-lg sm:text-xl md:text-2xl group-hover:animate-shake">😠</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow-sm sm:shadow-md md:shadow-lg rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 border-2 border-green-200 hover:border-green-300 transition-all hover:scale-[1.02] group">
          <h3 className="text-sm sm:text-base md:text-lg font-medium text-green-700 flex items-center">
            <span className="bg-green-100 p-0.5 sm:p-1 rounded-full mr-1 sm:mr-2">✅</span>
            Resolved Issues
          </h3>
          <div className="mt-1 sm:mt-2 md:mt-3 flex items-center">
            <p className="text-2xl sm:text-3xl md:text-5xl font-bold text-green-600 mr-1 sm:mr-2">
              {resolvedGrievances.length}
            </p>
            <div className="flex items-center">
              <StatusBadge status="RESOLVED" size={isMobile ? 'sm' : 'md'} />
              <span className="ml-1 sm:ml-2 text-green-400 text-lg sm:text-xl md:text-2xl group-hover:animate-bounce">😊</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Grievances with responsive layout */}
      <div className="space-y-3 sm:space-y-4 md:space-y-5">
        <div className="flex items-center">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-pink-700 flex items-center">
            <span className="bg-pink-100 p-1 sm:p-2 rounded-full mr-1 sm:mr-2 md:mr-3">🔍</span>
            {isMobile ? "Recent" : "Recent Mischiefs"}
          </h2>
        </div>
        
        {sortedGrievances.length === 0 ? (
          <div className="text-center py-6 sm:py-8 md:py-12 bg-white rounded-lg sm:rounded-xl shadow-sm sm:shadow-md border-2 border-pink-200 hover:border-pink-300 transition-all">
            <p className="text-xs sm:text-sm md:text-base text-gray-500 mb-2 sm:mb-3 md:mb-4">
              No complaints yet... but we both know that won't last! 😏
            </p>
            <Button
              onClick={() => navigate('/grievances/new')}
              className="mt-2 sm:mt-3 md:mt-4 bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white rounded-full px-4 sm:px-6 md:px-8 py-1.5 sm:py-2 md:py-3 shadow-md hover:shadow-pink-300 transform hover:scale-105 transition-all flex items-center mx-auto text-xs sm:text-sm md:text-base"
              size={isMobile ? "small" : "medium"}
            >
              <PlusIcon className="h-3 sm:h-4 md:h-5 w-3 sm:w-4 md:w-5 mr-1 sm:mr-2" />
              {isMobile ? 'File Complaint' : 'File Your First Complaint'}
            </Button>
          </div>
        ) : (
          <div className="space-y-2 sm:space-y-3 md:space-y-4">
            {sortedGrievances.slice(0, isMobile ? 2 : 3).map((grievance) => (
              <GrievanceCard 
                key={grievance.id} 
                grievance={grievance}
                onClick={() => navigate(`/grievances/${grievance.id}`)}
                className="border-2 border-pink-200 hover:border-pink-300 transition-all hover:shadow-sm sm:hover:shadow-md cursor-pointer hover:scale-[1.01]"
                compact={isMobile}
              />
            ))}
            
            {sortedGrievances.length > (isMobile ? 2 : 3) && (
              <div className="text-center pt-2 sm:pt-3 md:pt-4">
                <Button 
                  onClick={() => navigate('/grievances/all')}
                  className="bg-pink-100 cursor-pointer hover:bg-pink-200 text-pink-700 rounded-full px-4 sm:px-6 md:px-8 py-1.5 sm:py-2 md:py-3 shadow-sm sm:shadow-md hover:shadow-pink-300 transform hover:scale-105 transition-all flex items-center mx-auto text-xs sm:text-sm md:text-base"
                  size={isMobile ? "small" : "medium"}
                >
                  View All {allGrievances.length} Offenses
                  <ArrowRightIcon className="h-3 sm:h-4 md:h-5 w-3 sm:w-4 md:w-5 ml-1 sm:ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Responsive footer */}
      <div className="text-center text-pink-500 mt-6 sm:mt-8 md:mt-12 pb-3 sm:pb-4 md:pb-6 px-2">
        <p className="text-xs sm:text-sm md:text-base font-medium flex flex-wrap items-center justify-center">
          <span className="animate-bounce mr-1 sm:mr-2">💖</span>
          {isMobile ? 'Happy GF = Happy Life!' : 'A happy girlfriend means a happy life for him!'}
          <span className="animate-bounce ml-1 sm:ml-2">💖</span>
        </p>
        <p className="text-xxs sm:text-xs md:text-sm mt-1 text-pink-400">
          (But let's be real, iam still mess up tomorrow 😘)
        </p>
      </div>
    </div>
  );
};

export default DashboardPage;