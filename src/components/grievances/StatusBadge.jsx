import { HeartIcon, CheckIcon, ClockIcon, SparklesIcon } from '@heroicons/react/24/outline';

const StatusBadge = ({ status, size = 'md' }) => {
  // Size classes for responsive design
  const sizeClasses = {
    xs: {
      text: 'text-xs',
      padding: 'px-2 py-0.5',
      icon: 'h-3 w-3'
    },
    sm: {
      text: 'text-xs sm:text-sm',
      padding: 'px-2.5 py-1',
      icon: 'h-3.5 w-3.5'
    },
    md: {
      text: 'text-sm sm:text-base',
      padding: 'px-3 py-1',
      icon: 'h-4 w-4'
    },
    lg: {
      text: 'text-base sm:text-lg',
      padding: 'px-4 py-1.5',
      icon: 'h-5 w-5'
    }
  };

  // Romantic status configurations
  const statusStyles = {
    PENDING: {
      bg: 'bg-rose-50 hover:bg-rose-100',
      text: 'text-rose-700',
      border: 'border border-rose-200 hover:border-rose-300',
      icon: <ClockIcon className={`${sizeClasses[size].icon} text-rose-500`} />,
      label: 'Working On Us',
      pulse: 'animate-pulse'
    },
    RESOLVED: {
      bg: 'bg-gradient-to-br from-rose-50 to-pink-50 hover:from-rose-100 hover:to-pink-100',
      text: 'text-pink-700',
      border: 'border border-pink-200 hover:border-pink-300',
      icon: (
        <div className="relative">
          <HeartIcon className={`${sizeClasses[size].icon} text-pink-500`} />
          <SparklesIcon className="absolute -top-1 -right-1 h-2 w-2 text-yellow-400 animate-ping" />
        </div>
      ),
      label: 'Healed Together',
      sparkle: true
    },
    IN_PROGRESS: {
      bg: 'bg-purple-50 hover:bg-purple-100',
      text: 'text-purple-700',
      border: 'border border-purple-200 hover:border-purple-300',
      icon: <CheckIcon className={`${sizeClasses[size].icon} text-purple-500`} />,
      label: 'Making Amends'
    },
    default: {
      bg: 'bg-rose-100 hover:bg-rose-200',
      text: 'text-rose-900',
      border: 'border border-rose-300 hover:border-rose-400',
      icon: null,
      label: status
    }
  };

  const { bg, text, border, icon, label, pulse, sparkle } = statusStyles[status] || statusStyles.default;

  return (
    <span className={`
      inline-flex items-center rounded-full font-medium
      transition-all duration-300 ease-in-out
      ${sizeClasses[size].padding} ${sizeClasses[size].text}
      ${bg} ${text} ${border} 
      ${pulse || ''}
      shadow-sm shadow-rose-100/50 hover:shadow-md
      ${sparkle ? 'relative overflow-hidden' : ''}
    `}>
      {icon && (
        <span className={`mr-1.5 sm:mr-2 ${pulse || ''}`}>
          {icon}
        </span>
      )}
      <span className="whitespace-nowrap">
        {label}
      </span>
      
      {/* Sparkle effect for resolved status */}
      {sparkle && (
        <div className="absolute inset-0 overflow-hidden opacity-20">
          {[...Array(3)].map((_, i) => (
            <div 
              key={i}
              className="absolute text-yellow-400 animate-float"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${5 + Math.random() * 5}s`,
                animationDelay: `${Math.random() * 2}s`
              }}
            >
              ✨
            </div>
          ))}
        </div>
      )}
    </span>
  );
};

export default StatusBadge;