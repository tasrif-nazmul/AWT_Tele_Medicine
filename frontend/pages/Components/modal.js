import React from 'react';

const Modal = ({ children, onClose }) => {
    return (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg p-8 w-96"> 
                {/* Modal content */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Response to pending Health Service</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 focus:outline-none">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                {/* Children content */}
                {children}
            </div>
        </div>
    );
};

export default Modal;
