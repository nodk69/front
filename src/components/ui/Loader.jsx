import React from 'react';

const Loader = ({ size = 'medium', className = '' }) => {
  const sizeClasses = {
    small: 'h-5 w-5 border-2',
    medium: 'h-8 w-8 border-4',
    large: 'h-12 w-12 border-4',
  };

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div
        className={`animate-spin rounded-full border-4 border-pink-400 border-t-transparent ${sizeClasses[size]}`}
        style={{ animationDuration: '0.8s' }}
      />
    </div>
  );
};

export const InlineLoader = ({ text = 'Loading...' }) => {
  return (
    <div className="flex items-center space-x-2 text-sm text-pink-500">
      <Loader size="small" />
      <span>{text}</span>
    </div>
  );
};

export default Loader;