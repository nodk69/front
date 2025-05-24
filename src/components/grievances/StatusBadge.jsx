import { HeartIcon, CheckIcon, ClockIcon } from '@heroicons/react/24/outline';

const StatusBadge = ({ status }) => {
  const statusStyles = {
    PENDING: {
      bg: 'bg-rose-50',
      text: 'text-rose-700',
      border: 'border border-rose-200',
      icon: <ClockIcon className="h-4 w-4 text-rose-500" />,
      label: 'Working On Us'
    },
    RESOLVED: {
      bg: 'bg-gradient-to-br from-rose-50 to-pink-50',
      text: 'text-pink-700',
      border: 'border border-pink-200',
      icon: <HeartIcon className="h-4 w-4 text-pink-500" />,
      label: 'Healed Together'
    },
    default: {
      bg: 'bg-rose-100',
      text: 'text-rose-900',
      border: 'border border-rose-300',
      icon: null,
      label: status
    }
  };

  const { bg, text, border, icon, label } = statusStyles[status] || statusStyles.default;

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${bg} ${text} ${border} shadow-sm shadow-rose-100`}>
      {icon && <span className="mr-2">{icon}</span>}
      {label}
    </span>
  );
};

export default StatusBadge;