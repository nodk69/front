import React from 'react';

const Loader = ({ size = 'medium', className = '' }) => {
  const sizeClasses = {
    xsmall: 'h-4 w-4 border-2 sm:h-5 sm:w-5',
    small: 'h-5 w-5 border-2 sm:h-6 sm:w-6',
    medium: 'h-8 w-8 border-[3px] sm:h-10 sm:w-10 sm:border-4',
    large: 'h-10 w-10 border-4 sm:h-14 sm:w-14',
    xlarge: 'h-12 w-12 border-4 sm:h-16 sm:w-16'
  };

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div
        className={`animate-spin rounded-full border-pink-400 border-t-transparent ${sizeClasses[size]}`}
        style={{ animationDuration: '0.8s' }}
        aria-label="Loading"
      />
    </div>
  );
};

export const InlineLoader = ({ text = 'Loading...', mobileText = null }) => {
  return (
    <div className="flex items-center space-x-2 text-xs sm:text-sm text-pink-500">
      <Loader size="xsmall" />
      <span>{mobileText && window.innerWidth < 640 ? mobileText : text}</span>
    </div>
  );
};

export const PageLoader = () => {
  return (
    <div className="fixed inset-0 bg-pink-50/70 z-50 flex items-center justify-center">
      <div className="text-center space-y-4">
        <Loader size="xlarge" className="mx-auto" />
        <p className="text-pink-600 text-sm sm:text-base animate-pulse">
          Preparing your love notes...
        </p>
      </div>
    </div>
  );
};

export default Loader;