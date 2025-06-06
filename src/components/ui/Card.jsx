import React from 'react';

const Card = ({
  children,
  title,
  footer,
  className = '',
  titleClassName = '',
  bodyClassName = '',
  footerClassName = '',
  flatOnMobile = false,
  hoverEffect = true
}) => {
  return (
    <div className={`
      bg-pink-50 rounded-xl sm:rounded-2xl 
      ${flatOnMobile ? 'shadow-sm sm:shadow-lg' : 'shadow-lg'} 
      border border-pink-200
      ${hoverEffect ? 'hover:shadow-xl hover:border-pink-300 transition-all duration-200' : ''}
      ${className}
    `}>
      {title && (
        <div className={`
          px-4 py-3 sm:px-5 sm:py-4 
          border-b border-pink-200 
          ${titleClassName}
        `}>
          <h3 className="text-lg sm:text-xl font-bold text-pink-700">
            {title}
          </h3>
        </div>
      )}
      <div className={`
        p-4 sm:p-5 
        ${bodyClassName}
      `}>
        {children}
      </div>
      {footer && (
        <div className={`
          px-4 py-3 sm:px-5 sm:py-4 
          bg-pink-100 border-t border-pink-200 
          ${footerClassName}
        `}>
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;