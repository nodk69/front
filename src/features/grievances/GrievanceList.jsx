import React from 'react';
import { useGetAllGrievancesQuery } from '../../api/grievancesApi';
import { Link } from 'react-router-dom';

const GrievanceList = () => {
  const { data: grievances, isLoading, error } = useGetAllGrievancesQuery();

  if (isLoading)
    return <div className="text-center py-8 text-pink-600 animate-pulse">Hold on bae... fetching your grievances 💌</div>;

  if (error) {
    console.error("Error fetching grievances:", error);
    return (
      <div className="text-center py-8 text-red-500">
        Oops 😣 something went wrong... {error.message || "please try again later 🥺"}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-pink-700">
          My Little Grievances 💭
        </h1>
        <Link 
          to="/grievances/new"
          className="bg-pink-500 text-white px-5 py-2 rounded-full hover:bg-pink-600 transition-all shadow-md"
        >
          + Tell Bae 💌
        </Link>
      </div>

      <div className="space-y-6">
        {grievances?.length > 0 ? (
          grievances.map((grievance) => (
            <div
              key={grievance.id}
              className="border border-pink-200 rounded-2xl p-5 bg-white shadow hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold text-purple-800">
                    <Link
                      to={`/grievances/${grievance.id}`}
                      className="hover:underline hover:text-pink-600"
                    >
                      {grievance.title}
                    </Link>
                  </h2>
                  <p className="text-gray-600 mt-1 italic">
                    "{grievance.description.substring(0, 80)}..."
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    grievance.status === 'PENDING'
                      ? 'bg-yellow-100 text-yellow-700'
                      : grievance.status === 'IN_PROGRESS'
                      ? 'bg-purple-100 text-purple-700'
                      : grievance.status === 'RESOLVED'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {grievance.status === 'PENDING'
                    ? 'Waiting... ⏳'
                    : grievance.status === 'IN_PROGRESS'
                    ? 'Working on it... 💼'
                    : grievance.status === 'RESOLVED'
                    ? 'All Good Now 💖'
                    : 'Unknown 😶'}
                </span>
              </div>

              <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
                <span>
                  📅 Created: {new Date(grievance.createdAt).toLocaleDateString()}
                </span>
                <Link
                  to={`/grievances/${grievance.id}`}
                  className="text-pink-500 hover:text-pink-700 font-medium"
                >
                  Peek Details ➜
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            No grievances found... are we actually okay now? 🥹💗
          </div>
        )}
      </div>
    </div>
  );
};

export default GrievanceList;
