import React from 'react';

const Card = ({
  children,
  title,
  footer,
  className = '',
  titleClassName = '',
  bodyClassName = '',
  footerClassName = '',
}) => {
  return (
    <div className={`bg-pink-50 rounded-2xl shadow-lg border border-pink-200 ${className}`}>
      {title && (
        <div className={`px-5 py-4 border-b border-pink-200 ${titleClassName}`}>
          <h3 className="text-xl font-bold text-pink-700">{title}</h3>
        </div>
      )}
      <div className={`p-5 ${bodyClassName}`}>{children}</div>
      {footer && (
        <div className={`px-5 py-4 bg-pink-100 border-t border-pink-200 ${footerClassName}`}>
          {footer}
        </div>
      )}
    </div>
  );
};


export default Card;