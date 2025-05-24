import React from 'react';
import { useGetAllGrievancesQuery } from '../../api/grievancesApi';
import { Link } from 'react-router-dom';
import GrievanceCard from '../../components/grievances/GrievanceCard';

const GrievanceList = () => {
  const { data: grievances, isLoading, error } = useGetAllGrievancesQuery();

  if (isLoading)
    return <div className="text-center py-8 text-pink-600 animate-pulse text-sm sm:text-base">Hold on bae... fetching your grievances 💌</div>;

  if (error) {
    console.error("Error fetching grievances:", error);
    return (
      <div className="text-center py-8 text-red-500 text-sm sm:text-base">
        Oops 😣 something went wrong... {error.message || "please try again later 🥺"}
      </div>
    );
  }

  // Sort grievances by createdAt (most recent first)
  const sortedGrievances = [...(grievances || [])].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold sm:font-extrabold text-pink-700">
          {window.innerWidth < 640 ? 'My Grievances 💭' : 'My Little Grievances 💭'}
        </h1>
        <Link 
          to="/grievances/new"
          className="bg-pink-500 text-white px-4 py-1.5 sm:px-5 sm:py-2 rounded-full hover:bg-pink-600 transition-all shadow-md text-sm sm:text-base whitespace-nowrap"
        >
          {window.innerWidth < 640 ? '+ New 💌' : '+ Tell Bae 💌'}
        </Link>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {sortedGrievances.length > 0 ? (
          sortedGrievances.map((grievance) => (
            <GrievanceCard
              key={grievance.id}
              grievance={grievance}
              compact={window.innerWidth < 640}
              className="hover:shadow-md sm:hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => window.location.href = `/grievances/${grievance.id}`}
            />
          ))
        ) : (
          <div className="text-center py-8 text-gray-500 text-sm sm:text-base">
            No grievances found... are we actually okay now? 🥹💗
          </div>
        )}
      </div>
    </div>
  );
};

export default GrievanceList;
