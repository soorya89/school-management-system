import React from "react";

function ConfirmationModal({ show, onHide, onConfirm }) {
  if (!show) return null; 

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-96">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">Confirmation</h3>
          <button onClick={onHide} className="text-gray-600 hover:text-gray-800">
            &times;
          </button>
        </div>
        <div className="p-4">
          <p>Are you sure you want to delete this?</p>
        </div>
        <div className="flex justify-end p-4 border-t">
          <button
            onClick={onHide}
            className="mr-2 px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
