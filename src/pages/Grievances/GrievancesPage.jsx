import { useGetAllGrievancesQuery } from '../../api/grievancesApi';
import GrievanceCard from '../../components/grievances/GrievanceCard';
import Button from '../../components/ui/Button';
import Loader from '../../components/ui/Loader';

const GrievancesPage = () => {
  const { data: grievances, isLoading, isError } = useGetAllGrievancesQuery();

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader />
      </div>
    );

  if (isError)
    return (
      <div className="text-red-500 text-center py-8">Error loading grievances</div>
    );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 bg-pink-50 min-h-screen">
      <div className="bg-white shadow-md rounded-xl p-6 mb-6 border border-pink-100">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-semibold text-pink-700">All Grievances</h2>
          <Button
            as="link"
            to="/grievances/new"
            variant="primary"
            size="small"
            className="bg-indigo-500 hover:bg-indigo-600 transition-colors duration-200"
          >
            New Grievance
          </Button>
        </div>
      </div>

      {grievances?.length === 0 ? (
        <div className="bg-white shadow rounded-lg p-8 text-center border border-gray-100">
          <p className="text-gray-500 text-lg">No grievances found</p>
          <Button
            as="link"
            to="/grievances/new"
            variant="primary"
            className="mt-4 bg-pink-500 hover:bg-pink-600 transition-colors"
          >
            Create New Grievance
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          {grievances.map((grievance) => (
            <div
              key={grievance.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100"
            >
              <GrievanceCard grievance={grievance} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GrievancesPage;