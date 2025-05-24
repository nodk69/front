import React, { useState } from 'react';
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddStep = () => {
    if (newStep.trim()) {
      setFormData(prev => ({
        ...prev,
        resolutionSteps: [...prev.resolutionSteps, newStep.trim()]
      }));
      setNewStep('');
    }
  };

  const handleRemoveStep = (index) => {
    setFormData(prev => ({
      ...prev,
      resolutionSteps: prev.resolutionSteps.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.title.trim() || !formData.description.trim()) {
      setError("Babe, title and description can't be empty 😭");
      return;
    }

    try {
      await createGrievance(formData).unwrap();
      navigate(-1);
    } catch (err) {
      setError(err.data?.message || 'Oops! Something went wrong 🥺');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-100 to-purple-100 py-12 px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-8 border border-pink-200">
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="mr-4 text-pink-400 hover:text-pink-600 transition"
            title="Go back"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h1 className="text-3xl font-extrabold text-pink-600">Hey love, what's wrong? 🥺</h1>
        </div>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-lg shadow-sm">
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-pink-500 font-semibold mb-2" htmlFor="title">
              Give it a title 💌 *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl border-pink-300 focus:ring-2 focus:ring-pink-400"
              placeholder="What shall we call this sad thing? 😞"
              required
            />
          </div>

          <div>
            <label className="block text-pink-500 font-semibold mb-2" htmlFor="description">
              Tell me everything 😔
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl border-pink-300 h-32 focus:ring-2 focus:ring-pink-400"
              placeholder="What's been bugging you, sweetheart? 😢"
              required
            />
          </div>

          <div>
            <label className="block text-pink-500 font-semibold mb-2">
              What i need to do to fix? 💭 (Punishments😢)
            </label>
            <div className="space-y-2 mb-4">
              {formData.resolutionSteps.map((step, index) => (
                <div key={index} className="flex items-center space-x-2 bg-pink-50 p-2 rounded-xl">
                  <span className="text-sm text-pink-600 font-medium">{index + 1}.</span>
                  <span className="flex-grow text-gray-700">{step}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveStep(index)}
                    className="text-xs text-rose-500 hover:text-rose-700"
                  >
                    ✖ remove
                  </button>
                </div>
              ))}
            </div>
            <div className="flex rounded-lg overflow-hidden shadow-sm">
              <input
                type="text"
                value={newStep}
                onChange={(e) => setNewStep(e.target.value)}
                placeholder="Add a cute lil step 💡"
                className="flex-grow p-2 border border-pink-300 focus:ring-2 focus:ring-pink-400"
              />
              <button
                type="button"
                onClick={handleAddStep}
                className="bg-pink-400 text-white px-4 py-2 hover:bg-pink-500 transition"
              >
                + Add
              </button>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100"
            >
              Nevermind 😶
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 focus:ring-2 focus:ring-pink-400"
            >
              Submit it bby 💕
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GrievanceForm;
