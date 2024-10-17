import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addNewHistoryAction, historyUpdateAction } from '../../redux/actions/libraryAction';

const LibraryModal = ({ isOpen, onClose, onSubmit, onUpdateHistory, libraryHistory }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    studentID: "",
    bookId: "",
    borrowedDate: "",
    returnDate: "",
    status: "borrowed", // Default status
  });

  useEffect(() => {
    if (isOpen && libraryHistory) {
      setFormData({
        student: libraryHistory.studentID,
        bookId: libraryHistory.bookId,
        borrowedDate: libraryHistory.borrowedDate,
        returnDate: libraryHistory.returnDate || "", // Handle null values
        status: libraryHistory.status,
      });
    } else {
      setFormData({
        studentID: "",
        bookId: "",
        borrowedDate: "",
        returnDate: "",
        status: "borrowed",
      });
    }
  }, [isOpen, libraryHistory]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (libraryHistory) {
      const updatedHistory = await dispatch(historyUpdateAction(libraryHistory._id, formData));
      onUpdateHistory(updatedHistory);
    } else {
      const newHistory = await dispatch(addNewHistoryAction(formData));
      onSubmit(newHistory);
    }

    onClose();
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-white rounded-lg shadow-md p-6 w-96">
          <h2 className="text-xl font-bold mb-4">{libraryHistory ? "Edit Library Entry" : "Add Library Entry"}</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Student ID</label>
              <input
                type="text"
                name="studentID"
                value={formData.studentID}
                onChange={handleChange}
                className="border rounded-lg p-2 w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Book ID</label>
              <input
                type="text"
                name="bookId"
                value={formData.bookId}
                onChange={handleChange}
                className="border rounded-lg p-2 w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Borrowed Date</label>
              <input
                type="date"
                name="borrowedDate"
                value={formData.borrowedDate.split('T')[0]} // Format the date properly
                onChange={handleChange}
                className="border rounded-lg p-2 w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Return Date</label>
              <input
                type="date"
                name="returnDate"
                value={formData.returnDate.split('T')[0]} // Format the date properly
                onChange={handleChange}
                className="border rounded-lg p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Status</label>
              <select
                name="status"
                onChange={handleChange}
                value={formData.status}
                className="border rounded-lg p-2 w-full"
                required
              >
                <option value="borrowed">Borrowed</option>
                <option value="returned">Returned</option>
              </select>
            </div>

            <div className="flex justify-end">
              <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                {libraryHistory ? "Update" : "Add"}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default LibraryModal;
