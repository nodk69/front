import { useParams, useNavigate } from 'react-router-dom';
import { useGetGrievanceByIdQuery } from '../../api/grievancesApi';
import ResolutionSteps from '../../components/grievances/ResolutionSteps';
import Button from '../../components/ui/Button';
import Loader from '../../components/ui/Loader';
import { HeartIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { FaHeart, FaKissWinkHeart } from 'react-icons/fa';
import { GiHearts } from 'react-icons/gi';

const GrievanceDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: grievance, isLoading, isError } = useGetGrievanceByIdQuery(id);

  if (isLoading) return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Loader className="my-8 text-pink-500" />
      <motion.p 
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="text-pink-400 mt-4 text-center"
      >
        Reading your love note carefully...
      </motion.p>
    </div>
  );
  
  if (isError) return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <div className="bg-pink-50 rounded-xl p-6 max-w-md border-2 border-pink-200">
        <p className="text-pink-500 text-lg">Oopsie! Couldn't load this love note 💔</p>
        <Button 
          onClick={() => navigate(-1)} 
          className="mt-4 bg-gradient-to-r from-pink-300 to-rose-300 text-white"
        >
          Back to Our Love Notes
        </Button>
      </div>
    </div>
  );

  if (!grievance) return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <div className="bg-pink-50 rounded-xl p-6 max-w-md border-2 border-pink-200">
        <p className="text-pink-500 text-lg">Love note not found 😢</p>
        <Button 
          onClick={() => navigate('/')} 
          className="mt-4 bg-gradient-to-r from-pink-300 to-rose-300 text-white"
        >
          Return Home
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-rose-50 p-4 sm:p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        {/* Back Button */}
        <motion.div whileHover={{ x: -5 }}>
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-6 text-pink-600 hover:text-pink-800 flex items-center group"
            size="sm"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-1 group-hover:animate-pulse" />
            Our Love Notes
          </Button>
        </motion.div>

        {/* Love Note Card */}
        <motion.div 
          whileHover={{ scale: 1.005 }}
          className="relative mb-8 p-6 sm:p-8 bg-white rounded-3xl shadow-lg border-2 border-pink-200"
        >
          <div className="absolute -top-3 -left-3">
            <FaHeart className="h-6 w-6 text-pink-400 animate-pulse" />
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <FaKissWinkHeart className="h-8 w-8 text-pink-500 animate-bounce flex-shrink-0" />
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-pink-700 font-serif">
                {grievance.title}
              </h1>
              <div className="mt-2 text-pink-500 text-sm">
                Whispered on {new Date(grievance.createdAt).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </div>
            </div>
          </div>
          
          {/* Description Section */}
          <div className="mt-6 bg-pink-50 rounded-xl p-5 border border-pink-200">
            <div className="flex items-center text-pink-600 mb-2">
              <HeartIcon className="h-5 w-5 mr-2" />
              <h2 className="font-semibold">Your Heartfelt Message</h2>
            </div>
            <p className="text-pink-700 whitespace-pre-line leading-relaxed">
              {grievance.description}
            </p>
          </div>
          
          {/* Additional Content */}
          {grievance.content && (
            <div className="mt-6">
              <p className="text-pink-600 whitespace-pre-line leading-relaxed">
                {grievance.content}
              </p>
            </div>
          )}
          
          <div className="absolute -bottom-3 -right-3 rotate-12">
            <GiHearts className="h-8 w-8 text-pink-300" />
          </div>
        </motion.div>

        {/* Love Prescription */}
        <motion.div 
          whileHover={{ scale: 1.005 }}
          className="relative bg-white rounded-3xl shadow-lg p-6 sm:p-8 mb-8 border-2 border-pink-200"
        >
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-pink-400 to-rose-400 text-white px-4 py-1 rounded-full text-sm font-medium shadow-md">
            Our Healing Steps
          </div>
          
          <ResolutionSteps 
            grievance={grievance} 
            className="mt-8 space-y-3"
            itemClassName="flex items-start bg-pink-50 rounded-xl p-4 hover:bg-pink-100 transition-colors"
            checkboxClassName="h-5 w-5 text-pink-500 rounded-full focus:ring-pink-500 mt-1 border-2 border-pink-300"
            textClassName="ml-3 text-pink-700"
          />
        </motion.div>

        {/* Last Updated */}
        <div className="text-center text-pink-400 text-xs italic">
          Last touched on {new Date(grievance.updatedAt).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default GrievanceDetailPage;