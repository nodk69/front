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
    return <Loader className="my-8" />;

  if (isErrorAll || isErrorPending || isErrorResolved)
    return (
      <div className="text-pink-600 text-center mt-8 p-4 bg-pink-100 rounded-xl border border-pink-200">
        💔 Oopsie! Couldn't load your complaints. Try again, pookie?
      </div>
    );

  return (
    <div className="space-y-8 bg-gradient-to-b from-pink-50 to-rose-50 min-h-screen p-6">
      {/* Welcome Toast with extra cuteness */}
      {showWelcome && (
        <div
          className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ease-in-out ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <div className="bg-gradient-to-br from-pink-100 to-rose-100 border-2 border-pink-300 rounded-2xl p-6 shadow-xl max-w-md animate-bounce-light">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-pink-700 mb-2 flex items-center">
                  <HeartIcon className="h-6 w-6 mr-2 text-rose-500" />
                  Welcome, My Coconut! 👑
                </h2>
                <p className="text-pink-800 mb-4">
                  💌 Welcome to your <span className="font-semibold text-rose-600"> Complaint Diary</span>, my Queen 👑 <br />
                  Got something to say because I “forgot” again? 😅 <br />
                  Drop all your complaints that you have <span className="font-semibold text-rose-600">“he is idiot he cant understand…”</span> 💅💔 <br />
                  Don’t hold back, babe – this is your personal vent space 😘  
                  <br />📝 So go ahead, say the things lound… lovingly. I'll read it all and pretend I'm not crying in a corner 💔 i will do my best to resolve all
                </p>

              </div>
              <button
                onClick={() => {
                  setIsVisible(false);
                  // setTimeout(() => setShowWelcome(false), 1000);
                }}
                className="text-pink-500 hover:text-rose-600 transition-colors p-1"
              >
                ✕
              </button>
            </div>
            <div className="flex justify-center">
              <button
                onClick={() => {
                  setIsVisible(false);
                  setTimeout(() => setShowWelcome(false), 300);
                  navigate('/grievances/new');
                }}
                className="px-5 py-2 bg-gradient-to-r from-pink-400 to-rose-400 text-white rounded-full hover:from-pink-500 hover:to-rose-500 transition-all shadow-lg hover:shadow-pink-300 flex items-center"
              >
                Start Venting 💘
                <ArrowRightIcon className="h-4 w-4 ml-2 animate-bounce-horizontal" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header with cute animation */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="animate-float">
          <h1 className="text-3xl font-bold text-pink-700 flex items-center">
            <span className="bg-pink-100 p-2 rounded-full mr-3">👸</span>
            ARUNIMA's Complaint Log to HUMZA
          </h1>
          <p className="text-pink-500 mt-1">
            Tracking his offenses since {new Date().getFullYear()} 💅
          </p>
        </div>
        <Button 
          onClick={() => navigate('/grievances/new')}
          className="bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white rounded-full px-6 py-3 shadow-lg hover:shadow-pink-300 transform hover:scale-105 transition-all group"
        >
          <PlusIcon className="h-5 w-5 mr-1 group-hover:rotate-90 transition-transform" />
          New Complaint
        </Button>
      </div>

      {/* Stats Cards with cute emojis */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="bg-white shadow-xl rounded-2xl p-6 border-2 border-pink-200 hover:border-pink-300 transition-all hover:scale-[1.02] group">
          <h3 className="text-lg font-medium text-pink-700 flex items-center">
            <span className="bg-pink-100 p-1 rounded-full mr-2">📝</span>
            Total Complaints
          </h3>
          <div className="mt-3 flex items-end">
            <p className="text-5xl font-bold text-pink-600 mr-2">
              {allGrievances.length}
            </p>
            <span className="text-pink-400 mb-1 text-2xl group-hover:animate-shake">😤</span>
          </div>
        </div>
        
        <div className="bg-white shadow-xl rounded-2xl p-6 border-2 border-yellow-200 hover:border-yellow-300 transition-all hover:scale-[1.02] group">
          <h3 className="text-lg font-medium text-yellow-700 flex items-center">
            <span className="bg-yellow-100 p-1 rounded-full mr-2">⏳</span>
            Pending Apologies
          </h3>
          <div className="mt-3 flex items-center">
            <p className="text-5xl font-bold text-yellow-600 mr-2">
              {pendingGrievances.length}
            </p>
            <div className="flex items-center">
              <StatusBadge status="PENDING" />
              <span className="ml-2 text-yellow-400 text-2xl group-hover:animate-shake">😠</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow-xl rounded-2xl p-6 border-2 border-green-200 hover:border-green-300 transition-all hover:scale-[1.02] group">
          <h3 className="text-lg font-medium text-green-700 flex items-center">
            <span className="bg-green-100 p-1 rounded-full mr-2">✅</span>
            Resolved Issues
          </h3>
          <div className="mt-3 flex items-center">
            <p className="text-5xl font-bold text-green-600 mr-2">
              {resolvedGrievances.length}
            </p>
            <div className="flex items-center">
              <StatusBadge status="RESOLVED" />
              <span className="ml-2 text-green-400 text-2xl group-hover:animate-bounce">😊</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Grievances with perfect navigation */}
      <div className="space-y-5">
        <div className="flex items-center">
          <h2 className="text-2xl font-bold text-pink-700 flex items-center">
            <span className="bg-pink-100 p-2 rounded-full mr-3">🔍</span>
            Recent Mischiefs
          </h2>
        </div>
        
        {sortedGrievances.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-lg border-2 border-pink-200 hover:border-pink-300 transition-all">
            <p className="text-gray-500 mb-4 text-lg">
              No complaints yet... but we both know that won't last! 😏
            </p>
            <Button
              onClick={() => navigate('/grievances/new')}
              className="mt-4 bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white rounded-full px-8 py-3 shadow-lg hover:shadow-pink-300 transform hover:scale-105 transition-all flex items-center mx-auto"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              File Your First Complaint
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedGrievances.slice(0, 3).map((grievance) => (
              <GrievanceCard 
                key={grievance.id} 
                grievance={grievance}
                onClick={() => navigate(`/grievances/${grievance.id}`)}
                className="border-2 border-pink-200 hover:border-pink-300 transition-all hover:shadow-lg cursor-pointer hover:scale-[1.01]"
              />
            ))}
            
            {sortedGrievances.length > 3 && (
              <div className="text-center pt-4">
                <Button 
                  onClick={() => navigate('/grievances/all')}
                  className="bg-pink-100 cursor-pointer hover:bg-pink-200 text-pink-700 rounded-full px-8 py-3 shadow hover:shadow-pink-300 transform hover:scale-105 transition-all flex items-center mx-auto group"
                >
                  View All {allGrievances.length} Offenses
                  <ArrowRightIcon className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Super cute footer */}
      <div className="text-center text-pink-500 mt-12 pb-6">
        <p className="text-lg font-medium flex items-center justify-center">
          <span className="animate-bounce mr-2">💖</span>
          Remember: A happy girlfriend means a happy life for him!
          <span className="animate-bounce ml-2">💖</span>
        </p>
        <p className="text-sm mt-2 text-pink-400">
          (But let's be real, he'll still mess up tomorrow 😘)
        </p>
      </div>
    </div>
  );
};

export default DashboardPage;