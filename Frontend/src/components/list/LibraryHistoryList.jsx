import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listHistoryAction, historyDeleteAction } from "../../redux/actions/libraryAction";
import LibraryModal from "../Modal/LibraryModal";
import ConfirmationModal from "../Modal/ConfirmationModal";
import { toast } from "react-toastify";
import { FaEdit, FaTrash } from "react-icons/fa";

const LibraryList = () => {
  const [historyToDelete, setHistoryToDelete] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const { loading, error, history = [] } = useSelector((state) => state.historyList);
  const auth = useSelector((state) => state.auth);
  const { userInfo } = auth;

  useEffect(() => {
    if (userInfo) {
      dispatch(listHistoryAction());
    } else {
      console.error("User not authenticated");
    }
  }, [dispatch, userInfo]);

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedHistory(null);
  };

  const handleAddHistory = () => {
    setSelectedHistory(null);
    setIsModalOpen(true);
  };

  const handleEditHistory = (entry) => {
    setSelectedHistory(entry);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setHistoryToDelete(id);
    setShowModal(true);
  };

  const handleConfirmationClose = () => {
    setShowModal(false);
    setHistoryToDelete(null);
  };

  const confirmDelete = async () => {
    try {
      await dispatch(historyDeleteAction(historyToDelete));
      handleConfirmationClose();
      setTimeout(() => {
        dispatch(listHistoryAction());
      }, 1000);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateHistory = () => {
    toast.success("Library history updated successfully!");
    setTimeout(() => {
      dispatch(listHistoryAction());
    }, 1000);
  };

  const userRole = userInfo?.user?.role

  return (
    <>
       <div className="bg-white shadow-md rounded-lg p-6 m-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold mb-4">Library History</h2>
          {/* Show "Add New" button only if the user is an admin */}
          {userRole === "admin" && (
            <button
              onClick={handleAddHistory}
              className="bg-gray-700 text-white px-4 py-2 rounded-lg"
            >
              Add New
            </button>
          )}
        </div>
        {loading && <p>Loading...</p>}

        <table className="table-auto w-full mt-4 text-left text-gray-700">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2">Student ID</th>
              <th className="px-4 py-2">Book ID</th>
              <th className="px-4 py-2">Borrowed Date</th>
              <th className="px-4 py-2">Return Date</th>
              <th className="px-4 py-2">Status</th>
              {/* Show Actions column only if the user is an admin */}
              {userRole === "admin" && <th className="px-4 py-2">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {history.length > 0 ? (
              history.map((entry) => (
                <tr key={entry._id}>
                  <td className="px-4 py-2">{entry.studentID}</td>
                  <td className="px-4 py-2">{entry.bookId}</td>
                  <td className="px-4 py-2">{new Date(entry.borrowedDate).toLocaleDateString()}</td>
                  <td className="px-4 py-2">
                    {entry.returnDate ? new Date(entry.returnDate).toLocaleDateString() : "Not Returned"}
                  </td>
                  <td className="px-4 py-2">{entry.status}</td>
                  <td className="px-4 py-2 flex items-center">
                    {/* Show Edit button only if the user is an admin */}
                    {userRole === "admin" && (
                      <button
                        className="text-yellow-500 mr-2 flex items-center"
                        onClick={() => handleEditHistory(entry)}
                      >
                        <FaEdit className="mr-1" />
                      </button>
                    )}
                    {/* Show Delete button only if the user is an admin */}
                    {userRole === "admin" && (
                      <button
                        className="text-red-500"
                        onClick={() => handleDelete(entry._id)}
                      >
                        <FaTrash />
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="border border-gray-300 px-4 py-2 text-center">
                  No entries found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Library Modal for adding/updating library history */}
      <LibraryModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleAddHistory}
        onUpdateHistory={handleUpdateHistory}
        libraryHistory={selectedHistory}
      />

      {/* Confirmation Modal for delete action */}
      <ConfirmationModal
        show={showModal}
        onHide={handleConfirmationClose}
        onConfirm={confirmDelete}
      />
    </>
  );
};

export default LibraryList;
