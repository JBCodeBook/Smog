import React, { useEffect, useRef } from 'react';

function CustomModal({ closeModal, dataContainer }) {
  const modalRef = useRef(null);

  useEffect(() => {
    // Set focus to the modal when it opens
    if (modalRef.current) {
      modalRef.current.focus();
    }
  }, []);

  const handleBackdropClick = (e) => {
    if (e.target === modalRef.current) {
      closeModal();
    }
  };

  return (
    <div
      ref={modalRef}
      id="default-modal"
      tabIndex="-1"
      aria-hidden="true"
      aria-labelledby="modal-title"
      role="dialog"
      className="overflow-y-auto overflow-x-hidden fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
      onClick={handleBackdropClick}
    >
      <div className="relative p-4 w-full max-w-2xl max-h-full bg-white rounded-lg shadow dark:bg-gray-700 focus:outline-none">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 id="modal-title" className="text-xl font-semibold text-gray-900 dark:text-white">
              {dataContainer?.fullName || 'Loading...'}
            </h3>
            <button
              type="button"
              onClick={closeModal}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-4 md:p-5 space-y-4">
            <h3>Additional Information:</h3>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              {dataContainer?.additionalInfo?.sources || 'No source information available.'}
            </p>
            <h3>Effects:</h3>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              {dataContainer?.additionalInfo?.effects || 'No effects information available.'}
            </p>
          </div>
          <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
            {/* You can add footer content here if needed */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomModal;
