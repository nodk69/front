import { useParams, useNavigate } from 'react-router-dom';
import { useGetGrievanceByIdQuery, useAddResolutionStepsMutation } from '../../api/grievancesApi';
import ResolutionSteps from '../../components/grievances/ResolutionSteps';
import Button from '../../components/ui/Button';
import Loader from '../../components/ui/Loader';
import Modal from '../../components/ui/Modal';
import { useState } from 'react';
import { HeartIcon, ArrowLeftIcon, PlusIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { FaHeart, FaKissWinkHeart, FaRegHeart, FaHeartbeat } from 'react-icons/fa';
import { GiHearts } from 'react-icons/gi';

const GrievanceDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isAddStepsModalOpen, setIsAddStepsModalOpen] = useState(false);
  const [newSteps, setNewSteps] = useState(['']);
  const [showConfetti, setShowConfetti] = useState(false);

  const { data: grievance, isLoading, isError, refetch } = useGetGrievanceByIdQuery(id);
  const [addSteps] = useAddResolutionStepsMutation();

  const handleAddStep = () => setNewSteps([...newSteps, '']);

  const handleStepChange = (index, value) => {
    const updatedSteps = [...newSteps];
    updatedSteps[index] = value;
    setNewSteps(updatedSteps);
  };

  const handleSubmitSteps = async () => {
    try {
      await addSteps({
        grievanceId: id,
        newSteps: newSteps.filter(step => step.trim() !== ''),
      }).unwrap();
      setIsAddStepsModalOpen(false);
      setNewSteps(['']);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
      refetch();
    } catch (error) {
      console.error('Failed to add steps:', error);
    }
  };

  if (isLoading) return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Loader className="my-8 text-pink-500" />
      <motion.p 
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="text-pink-400 mt-4"
      >
        Loading your love note...
      </motion.p>
    </div>
  );
  
  if (isError) return <div className="text-pink-500 text-center py-10">Oopsie! Couldn't load this love note 💔</div>;
  if (!grievance) return <div className="text-center py-10">Love note not found 😢</div>;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-md mx-auto p-6 bg-gradient-to-br from-pink-50 to-rose-50 rounded-3xl shadow-xl border-2 border-pink-200"
    >
      {showConfetti && (
        <Confetti 
          recycle={false}
          numberOfPieces={200}
          colors={['#ff7eb9', '#ff65a3', '#7afcff', '#feff9c', '#fff740']}
        />
      )}

      <motion.div whileHover={{ scale: 1.05 }}>
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-4 text-pink-500 hover:text-pink-700 flex items-center group"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-1 group-hover:animate-pulse" />
          Back to Our Love Notes
        </Button>
      </motion.div>

      <motion.div 
        whileHover={{ scale: 1.01 }}
        className="relative mb-6 p-6 bg-white rounded-2xl shadow-md border-2 border-pink-300"
      >
        <div className="absolute -top-3 -left-3">
          <FaHeart className="h-6 w-6 text-pink-400 animate-pulse" />
        </div>
        <div className="flex items-center">
          <FaKissWinkHeart className="h-7 w-7 text-pink-500 mr-3 animate-bounce" />
          <h1 className="text-2xl font-bold text-pink-700 mb-2 font-serif">{grievance.title}</h1>
        </div>
        <p className="text-pink-600 whitespace-pre-line mt-3 font-medium">{grievance.content}</p>
        <div className="absolute -bottom-3 -right-3 rotate-12">
          <GiHearts className="h-8 w-8 text-pink-300" />
        </div>
      </motion.div>

      <motion.div 
        whileHover={{ scale: 1.01 }}
        className="relative bg-white rounded-2xl shadow-md p-6 mb-6 border-2 border-pink-300"
      >
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-pink-400 to-rose-400 text-white px-4 py-1 rounded-full text-sm font-medium shadow-md flex items-center">
          <FaHeartbeat className="mr-2" /> Love Prescription
        </div>
        
        <ResolutionSteps 
          grievance={grievance} 
          isAdmin={false} 
          className="space-y-4 mt-4" 
          itemClassName="flex items-start bg-pink-50 rounded-xl p-3"
          checkboxClassName="h-6 w-6 text-pink-500 rounded-full focus:ring-pink-500 mt-1 border-2 border-pink-300"
          textClassName="ml-3 text-pink-700 font-medium"
        />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsAddStepsModalOpen(true)}
          className="mt-5 text-pink-500 hover:text-pink-700 flex items-center text-sm font-medium bg-pink-100 rounded-full px-4 py-2 mx-auto"
        >
          <PlusIcon className="h-4 w-4 mr-1" />
          Will Unlock in new features
        </motion.button>
      </motion.div>

      <div className="text-xs text-pink-400 mt-6 italic text-center">
        <p>Whispered on {new Date(grievance.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        <p>Last touched on {new Date(grievance.updatedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>

      <Modal
        isOpen={isAddStepsModalOpen}
        onClose={() => setIsAddStepsModalOpen(false)}
        title="Add More Love"
        className="bg-white rounded-2xl p-6 shadow-xl max-w-md border-2 border-pink-300"
        titleClassName="text-pink-600 font-semibold text-xl border-b border-pink-200 pb-3 mb-4 text-center flex justify-center items-center"
        titleIcon={<FaRegHeart className="ml-2 animate-pulse" />}
      >
        <div className="space-y-4">
          {newSteps.map((step, index) => (
            <motion.div 
              key={index} 
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <span className="text-pink-500 font-medium">{index + 1}.</span>
              <input
                type="text"
                value={step}
                onChange={(e) => handleStepChange(index, e.target.value)}
                className="flex-1 border-2 border-pink-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-pink-400 focus:border-transparent transition font-medium placeholder-pink-300"
                placeholder="How can we love more?"
              />
              {index === newSteps.length - 1 && (
                <motion.button
                  whileHover={{ scale: 1.2, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  onClick={handleAddStep}
                  className="text-pink-500 hover:text-pink-700 transition p-1 bg-pink-100 rounded-full"
                >
                  <PlusIcon className="h-5 w-5" />
                </motion.button>
              )}
            </motion.div>
          ))}
          <div className="flex justify-center space-x-4 pt-6">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button
                variant="ghost"
                onClick={() => setIsAddStepsModalOpen(false)}
                className="text-pink-500 hover:text-pink-700 border-2 border-pink-300 rounded-xl px-6"
              >
                Maybe Later
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="primary"
                onClick={handleSubmitSteps}
                className="bg-gradient-to-r from-pink-400 to-rose-500 hover:from-pink-500 hover:to-rose-600 text-white rounded-xl py-2 px-6 shadow-lg shadow-pink-200 font-medium"
              >
                Send Love 💖
              </Button>
            </motion.div>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
};

export default GrievanceDetailPage;