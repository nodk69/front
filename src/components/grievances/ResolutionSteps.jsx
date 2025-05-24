import { useState } from 'react';
import { 
  useMarkStepCompletedByUserMutation,
  useAddResolutionStepsMutation 
} from '../../api/grievancesApi';
import Button from '../ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaCheck, FaClock, FaTimes, FaPlus } from 'react-icons/fa';
import Confetti from 'react-confetti';

const ResolutionSteps = ({ grievance, onStepAdded }) => {
  const [markStepCompleted] = useMarkStepCompletedByUserMutation();
  const [addSteps] = useAddResolutionStepsMutation();
  const [isAddingStep, setIsAddingStep] = useState(false);
  const [newStep, setNewStep] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [error, setError] = useState(null);

  const handleCompleteStep = async (step) => {
    try {
      await markStepCompleted({ 
        id: grievance.id, 
        step 
      }).unwrap();
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    } catch (error) {
      setError(error.data?.message || "Failed to complete step");
    }
  };

  const handleAddNewStep = async () => {
    if (!newStep.trim()) {
      setError("Step can't be empty");
      return;
    }
    
    try {
      await addSteps({
        grievanceId: grievance.id,
        newSteps: [newStep.trim()]
      }).unwrap();
      setNewStep('');
      setIsAddingStep(false);
      setError(null);
      onStepAdded?.();
    } catch (error) {
      setError(error.data?.message || "Failed to add step");
    }
  };

  const handleRemoveStep = async (stepToRemove) => {
    try {
      const updatedSteps = grievance.resolutionSteps.filter(step => step !== stepToRemove);
      await addSteps({
        grievanceId: grievance.id,
        newSteps: updatedSteps
      }).unwrap();
      onStepAdded?.();
    } catch (error) {
      setError(error.data?.message || "Failed to remove step");
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {showConfetti && (
        <Confetti 
          recycle={false}
          numberOfPieces={200}
          colors={['#ff7eb9', '#ff65a3', '#7afcff', '#feff9c', '#fff740']}
          width={window.innerWidth}
          height={window.innerHeight}
        />
      )}

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 md:p-4 rounded-lg text-sm md:text-base">
          <p>{error}</p>
        </div>
      )}

      <div className="space-y-3 md:space-y-4">
        <AnimatePresence>
          {grievance?.completedSteps?.map((step, index) => (
            <motion.div 
              key={`completed-${index}`}
              className="flex items-start bg-pink-50 rounded-lg p-3 md:p-4 border border-pink-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex-shrink-0 h-5 w-5 md:h-6 md:w-6 flex items-center justify-center rounded-full bg-pink-500 mr-2 md:mr-3">
                <FaCheck className="h-2.5 w-2.5 md:h-3 md:w-3 text-white" />
              </div>
              <span className="text-xs md:text-sm text-pink-700 line-through">{step}</span>
            </motion.div>
          ))}

          {grievance?.resolutionSteps?.map((step, index) => (
            <motion.div 
              key={`pending-${index}`}
              className="flex items-start bg-white rounded-lg p-3 md:p-4 border border-pink-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex-shrink-0 h-5 w-5 md:h-6 md:w-6 flex items-center justify-center rounded-full bg-pink-100 border border-pink-200 mr-2 md:mr-3">
                <FaClock className="h-2.5 w-2.5 md:h-3 md:w-3 text-pink-500" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-xs md:text-sm text-pink-800 break-words">{step}</span>
                <div className="flex flex-col xs:flex-row justify-end gap-2 mt-2">
                  <Button
                    variant="ghost"
                    size="xsmall"
                    onClick={() => handleRemoveStep(step)}
                    className="text-xs py-1"
                  >
                    Remove
                  </Button>
                  <Button
                    variant="primary"
                    size="xsmall"
                    onClick={() => handleCompleteStep(step)}
                    className="text-xs py-1 cursor-pointer"
                  >
                    Complete
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}

          {isAddingStep && (
            <motion.div 
              className="bg-pink-50 rounded-lg p-3 md:p-4 border-2 border-dashed border-pink-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <input
                type="text"
                value={newStep}
                onChange={(e) => {
                  setNewStep(e.target.value);
                  setError(null);
                }}
                className="w-full border border-pink-200 rounded-lg px-2 py-1.5 md:px-3 md:py-2 mb-2 md:mb-3 text-xs md:text-sm"
                placeholder="What loving action should we take next?"
                autoFocus
              />
              <div className="flex justify-end gap-2 md:gap-3">
                <Button
                  variant="ghost"
                  size="xsmall"
                  onClick={() => setIsAddingStep(false)}
                  className="text-xs"
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="xsmall"
                  onClick={handleAddNewStep}
                  className="text-xs"
                >
                  Add
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!isAddingStep && (
          <Button
            onClick={() => setIsAddingStep(true)}
            className="mx-auto cursor-pointer"
            size="small"
          >
            <FaPlus className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" />
            Add New Step
          </Button>
        )}
      </div>
    </div>
  );
};

export default ResolutionSteps;