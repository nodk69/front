import React, { useState, useEffect } from 'react';
import { useCreateGrievanceMutation } from '../../api/grievancesApi';
import { useNavigate } from 'react-router-dom';

const GrievanceForm = () => {
  const [createGrievance] = useCreateGrievanceMutation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    resolutionSteps: []
  });

  const [newStep, setNewStep] = useState('');
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  // Handle resize for mobile responsiveness
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddStep = () => {
    if (newStep.trim()) {
      setFormData((prev) => ({
        ...prev,
        resolutionSteps: [...prev.resolutionSteps, newStep.trim()]
      }));
      setNewStep('');
    }
  };

  const handleRemoveStep = (index) => {
    setFormData((prev) => ({
      ...prev,
      resolutionSteps: prev.resolutionSteps.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.title || !formData.description) {
      setError("Title and description can't be empty 😭");
      return;
    }

    try {
      await createGrievance(formData).unwrap();
      navigate(-1);
    } catch (err) {
      setError(err.data?.message || 'Oopsie... something went wrong 🥺');
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 py-8 px-4">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-md p-6 border border-pink-100">

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="text-pink-400 hover:text-pink-600 transition mb-3"
        >
          ← Back
        </button>

        {/* Title */}
        <h1 className="text-xl sm:text-2xl font-semibold text-pink-600 mb-6">
          {isMobile ? "What's wrong? 🥺" : "Hey love, what's wrong? 💬"}
        </h1>

        {/* Error message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 text-red-600 p-3 mb-5 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title input */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-pink-500 mb-1">Title this sadness ❤️</label>
            <input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="E.g., You forgot our date 😢"
              required
              className="w-full px-3 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm"
            />
          </div>

          {/* Description textarea */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-pink-500 mb-1">Tell me everything 💔</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="I felt sad when..."
              required
              rows={4}
              className="w-full px-3 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm"
            />
          </div>

          {/* Resolution steps */}
          <div>
            <label className="block text-sm font-medium text-pink-500 mb-2">How I can fix it 💬</label>

            {/* List of steps */}
            {formData.resolutionSteps.length > 0 && (
              <ul className="space-y-2 mb-3">
                {formData.resolutionSteps.map((step, index) => (
                  <li key={index} className="flex items-center justify-between bg-pink-50 px-3 py-1.5 rounded-lg text-sm text-gray-700">
                    <span>{index + 1}. {step}</span>
                    <button type="button" onClick={() => handleRemoveStep(index)} className="text-xs text-rose-400 hover:text-rose-600">×</button>
                  </li>
                ))}
              </ul>
            )}

            {/* Add step input */}
            <div className="flex gap-2">
              <input
                value={newStep}
                onChange={(e) => setNewStep(e.target.value)}
                placeholder="E.g., Apologize with flowers 🌹"
                className="flex-grow px-3 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm"
              />
              <button
                type="button"
                onClick={handleAddStep}
                className="px-3 py-2 bg-pink-100 text-pink-600 rounded-lg hover:bg-pink-200 text-sm"
              >
                +
              </button>
            </div>
          </div>

          {/* Submit buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 border border-pink-200 text-pink-500 rounded-lg hover:bg-pink-50 text-sm"
            >
              Cancel 😶
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-pink-400 to-rose-400 text-white rounded-lg hover:from-pink-500 hover:to-rose-500 text-sm"
            >
              Submit 💕
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GrievanceForm;