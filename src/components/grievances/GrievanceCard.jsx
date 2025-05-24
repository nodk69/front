import { Link } from 'react-router-dom';
import StatusBadge from './StatusBadge';
import { formatDate } from '../../utills/helpers';
import { useGetGrievanceByIdQuery } from '../../api/grievancesApi';
import { HeartIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const GrievanceCard = ({ grievance }) => {
  const { data: detailedGrievance } = useGetGrievanceByIdQuery(grievance.id, {
    skip: !grievance.id
  });

  return (
    <div className="border border-rose-200 rounded-xl bg-gradient-to-br from-rose-50 to-white shadow-sm hover:shadow-lg transition-all duration-300 hover:border-rose-300">
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center mb-2">
              <HeartIcon className="h-5 w-5 text-rose-400 mr-2" />
              <h3 className="text-lg font-medium text-rose-800">
                <Link 
                  to={`/grievances/${grievance.id}`} 
                  className="hover:text-rose-600 transition-colors"
                >
                  {grievance.title}
                </Link>
              </h3>
            </div>
            <p className="text-sm text-rose-600 line-clamp-2">
              {grievance.description}
            </p>
          </div>
          <StatusBadge status={grievance.status} />
        </div>

        <div className="mt-5 flex items-center justify-between">
          <div className="flex items-center space-x-3 text-sm text-rose-500">
            <span className="bg-rose-100 px-2 py-1 rounded-lg">
              Shared: {formatDate(grievance.createdAt)}
            </span>
            {detailedGrievance?.userApprovedResolution && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-rose-200 to-pink-200 text-pink-700">
                Healing Achieved 💖
              </span>
            )}
          </div>

          <Link 
            to={`/grievances/${grievance.id}`}
            className="text-sm font-medium text-rose-600 hover:text-rose-700 group transition-colors flex items-center"
          >
            Our Journey <ArrowRightIcon className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GrievanceCard;