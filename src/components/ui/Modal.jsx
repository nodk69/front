import React, { useEffect } from 'react';

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'medium',
  closeOnOverlayClick = true,
  fullScreenOnMobile = true,
}) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEscape);
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    small: 'sm:max-w-md',
    medium: 'sm:max-w-lg',
    large: 'sm:max-w-2xl',
    xlarge: 'sm:max-w-4xl',
    full: 'sm:max-w-full'
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className={`flex items-center justify-center min-h-screen ${fullScreenOnMobile ? 'p-0' : 'p-4'} text-center`}>
        {/* Overlay */}
        <div
          className="fixed inset-0 bg-pink-200 bg-opacity-60 transition-opacity"
          aria-hidden="true"
          onClick={closeOnOverlayClick ? onClose : null}
        />

        {/* Modal Content */}
        <div
          className={`inline-block align-bottom bg-white rounded-t-2xl sm:rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all w-full ${fullScreenOnMobile ? 'h-screen sm:h-auto' : ''} sm:my-8 sm:align-middle ${sizeClasses[size]}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          {/* Header */}
          <div className="bg-pink-100 px-4 sm:px-5 py-3 sm:py-4 flex items-center justify-between border-b border-pink-200 sticky top-0 z-10">
            <h3 className="text-lg font-semibold text-pink-800" id="modal-headline">
              {title}
            </h3>
            <button
              type="button"
              className="text-pink-400 hover:text-pink-600 focus:outline-none"
              onClick={onClose}
            >
              <span className="sr-only">Close</span>
              <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className={`px-4 sm:px-6 py-4 sm:py-5 overflow-y-auto ${fullScreenOnMobile ? 'h-[calc(100%-120px)]' : ''}`}>
            {children}
          </div>

          {/* Footer */}
          {footer && (
            <div className="bg-pink-50 px-4 sm:px-6 py-3 sm:py-4 border-t border-pink-200 sticky bottom-0">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;