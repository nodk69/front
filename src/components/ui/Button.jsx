import React from 'react';

const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'medium',
  disabled = false,
  onClick,
  className = '',
  fullWidth = false,
  ...props
}) => {
  const baseClasses = 'rounded-full font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 inline-flex items-center justify-center';

  const variantClasses = {
    primary: 'bg-pink-500 text-white hover:bg-pink-600 focus:ring-pink-300',
    secondary: 'bg-white text-pink-600 border border-pink-500 hover:bg-pink-50 focus:ring-pink-300',
    danger: 'bg-red-400 text-white hover:bg-red-500 focus:ring-red-300',
    ghost: 'bg-transparent text-pink-500 hover:bg-pink-100 focus:ring-pink-300',
    gradient: 'bg-gradient-to-r from-pink-400 to-rose-400 text-white hover:from-pink-500 hover:to-rose-500 focus:ring-pink-300',
  };

  const sizeClasses = {
    xsmall: 'px-2.5 py-1 text-xs sm:text-xs',
    small: 'px-3 py-1.5 text-sm sm:text-sm',
    medium: 'px-4 py-2 text-sm sm:text-base',
    large: 'px-5 py-2.5 text-base sm:text-lg',
    xlarge: 'px-6 py-3 text-lg sm:text-xl',
  };

  const responsiveSizeClasses = {
    xsmall: 'text-xs px-2.5 py-1 sm:text-xs sm:px-3 sm:py-1',
    small: 'text-xs px-3 py-1.5 sm:text-sm sm:px-4 sm:py-1.5',
    medium: 'text-sm px-4 py-2 sm:text-base sm:px-5 sm:py-2',
    large: 'text-base px-5 py-2.5 sm:text-lg sm:px-6 sm:py-3',
    xlarge: 'text-lg px-6 py-3 sm:text-xl sm:px-8 sm:py-4',
  };

  const disabledClasses = 'opacity-70 cursor-not-allowed';

  return (
    <button
      type={type}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${responsiveSizeClasses[size]}
        ${disabled ? disabledClasses : ''}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;