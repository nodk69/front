import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  useGetGrievanceByIdQuery,
  useCompleteStepMutation,
} from '../../api/grievancesApi';
import { Heart, Sparkles } from 'lucide-react';

const GrievanceDetails = () => {
  const { id } = useParams();
  const { data: grievance, isLoading, error } = useGetGrievanceByIdQuery(id);
  const [completeStep] = useCompleteStepMutation();
  const navigate = useNavigate();

  if (isLoading) return <div className="text-center py-8 text-pink-500">Loading cuteness...</div>;
  if (error) return <div className="text-center py-8 text-red-400">Oh no! Something went wrong 💔</div>;
  if (!grievance) return <div className="text-center py-8 text-gray-500">Grievance not found 😢</div>;

  const handleCompleteStep = async (step) => {
    try {
      await completeStep({ id: grievance.id, step }).unwrap();
    } catch (err) {
      console.error('Failed to complete step:', err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      <Link
        to="/"
        className="text-pink-600 hover:underline mb-4 inline-block text-sm flex items-center space-x-1"
      >
        <span>←</span> <span>Back to Love List</span>
      </Link>

      <div className="bg-pink-50 rounded-3xl shadow-xl p-8 border border-pink-100">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-pink-700 flex items-center gap-2">
              <Sparkles size={22} /> {grievance.title}
            </h1>
            <p className="text-pink-500 mt-2">{grievance.description}</p>
          </div>
          <span
            className={`px-4 py-1 rounded-full text-xs font-semibold border transition-all ${
              grievance.status === 'PENDING'
                ? 'bg-yellow-100 text-yellow-800 border-yellow-300'
                : grievance.status === 'IN_PROGRESS'
                ? 'bg-blue-100 text-blue-800 border-blue-300'
                : grievance.status === 'RESOLVED'
                ? 'bg-green-100 text-green-800 border-green-300'
                : 'bg-red-100 text-red-800 border-red-300'
            }`}
          >
            {grievance.status}
          </span>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold text-pink-600 mb-3">Resolution Progress 💖</h2>
          <div className="space-y-3">
            {grievance.resolutionSteps.map((step, index) => {
              const completed = grievance.completedSteps.includes(step);
              return (
                <div
                  key={index}
                  className="flex items-center bg-white rounded-xl px-4 py-2 shadow-sm border border-pink-100"
                >
                  <input
                    type="checkbox"
                    checked={completed}
                    onChange={() => handleCompleteStep(step)}
                    className="mr-3 h-5 w-5 text-pink-500 focus:ring-pink-400 rounded"
                    disabled={completed}
                  />
                  <span
                    className={`text-sm ${
                      completed ? 'line-through text-gray-400' : 'text-pink-700'
                    }`}
                  >
                    {step}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-6 text-xs text-pink-400 font-light space-y-1">
          <p>Created at: {new Date(grievance.createdAt).toLocaleString()}</p>
          <p>Last updated: {new Date(grievance.updatedAt).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default GrievanceDetails;
