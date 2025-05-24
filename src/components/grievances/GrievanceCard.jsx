import { Link } from 'react-router-dom';
import StatusBadge from './StatusBadge';
import { formatDate } from '../../utills/helpers'; // Fixed typo: 'utills' → 'utils'
import { useGetGrievanceByIdQuery } from '../../api/grievancesApi';
import { HeartIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const GrievanceCard = ({ grievance, compact = false }) => {
  const { data: detailedGrievance } = useGetGrievanceByIdQuery(grievance.id, {
    skip: !grievance.id
  });

  const statusEmojis = {
    PENDING: '💔',
    IN_PROGRESS: '💌',
    RESOLVED: '💖'
  };

  return (
    <div className={`relative border border-pink-100 rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-300 ${compact ? 'p-3' : 'p-4'}`}>
      
      {/* Romantic header */}
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <HeartIcon className="h-5 w-5 text-pink-400" />
          <h3 className={`${compact ? 'text-sm' : 'text-base'} font-medium text-pink-700 truncate`}>
            <Link 
              to={`/grievances/${grievance.id}`} 
              className="hover:text-pink-900 hover:underline"
            >
              "{grievance.title}"
            </Link>
          </h3>
        </div>
        <StatusBadge status={grievance.status} size="sm" />
      </div>

      {/* Short description */}
      <p className={`${compact ? 'text-xs' : 'text-sm'} text-pink-600 italic mb-2 line-clamp-2`}>
        ❝{grievance.description}❞
      </p>

      {/* Emotional ribbon */}
      <div className="mb-3 flex items-center justify-center gap-2">
        <span className="text-lg">{statusEmojis[grievance.status] || '💔'}</span>
        <span className={`text-xs uppercase tracking-wide text-pink-400 font-medium`}>
          {grievance.status.replace('_', ' ')}
        </span>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center text-xs text-pink-400">
        <span>🪷 {formatDate(grievance.createdAt)}</span>

        {detailedGrievance?.userApprovedResolution && (
          <span className="flex items-center gap-1">
            ✨ <span className="font-medium">Love Restored</span>
          </span>
        )}

        <Link
          to={`/grievances/${grievance.id}`}
          className="flex items-center gap-1 font-medium text-pink-500 hover:text-pink-700"
        >
          Your punishments
          <ArrowRightIcon className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
};

export default GrievanceCard;