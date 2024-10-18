import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FaEdit, FaTrash } from "react-icons/fa";
import { listFeeHistoryAction,feeHistoryDeleteAction } from "../../redux/actions/feeAction";
import ConfirmationModal from "../Modal/ConfirmationModal";
import FeeModal from '../Modal/FeeModal'

const FeeHistoryList =() =>{

    const [historyToDelete, setHistoryToDelete] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedHistory, setSelectedHistory] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();
    const { loading, error, history= [] } = useSelector((state) => state.feeHistoryList);

    const auth = useSelector((state) => state.auth);
    const { userInfo } = auth;
    
    useEffect(() => {
      if (userInfo) {
        dispatch(listFeeHistoryAction());
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
 
  
    const handleConfirmationClose = () => {
      setShowModal(false);
      setHistoryToDelete(null);
    };
  
    const confirmDelete = async () => {
      try {
        await dispatch(feeHistoryDeleteAction(historyToDelete));
        handleConfirmationClose();
        setTimeout(() => {
          dispatch(listFeeHistoryAction()); 
        }, 1000);
      } catch (error) {
        console.error(error);
      }
    };
  
    const handleUpdateHistory = () => {
      toast.success("Fee history updated successfully!");
      setTimeout(() => {
        dispatch(listFeeHistoryAction());
      }, 1000);
    };
    const userRole = userInfo?.user?.role;
    return (
      <>
        <div className="bg-white shadow-md rounded-lg p-6 m-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold mb-4">Fees History</h2>
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
                            <th className="px-4 py-2">Fee Type</th>
                            <th className="px-4 py-2">Amount</th>
                            <th className="px-4 py-2">Payment Date</th>
                            <th className="px-4 py-2">Status</th>
                            {/* Show Actions column only if the user is an admin or office staff */}
                            {(userRole === "admin" || userRole === "officeStaff") && (
                                <th className="px-4 py-2">Actions</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {history.length > 0 ? (
                            history.map((entry) => (
                                <tr key={entry._id}>
                                    <td className="px-4 py-2">{entry.studentID}</td>
                                    <td className="px-4 py-2">{entry.feeType}</td>
                                    <td className="px-4 py-2">{entry.amount}</td>
                                    <td className="px-4 py-2">
                                        {entry.paymentDate ? new Date(entry.paymentDate).toLocaleDateString() : "Not Returned"}
                                    </td>
                                    <td className="px-4 py-2">{entry.status}</td>
                                    <td className="px-4 py-2 flex items-center">
                                        {/* Show Edit button only if the user is an admin or office staff */}
                                        {(userRole === "admin" || userRole === "officeStaff") && (
                                            <>
                                                <button
                                                    className="text-yellow-500 mr-2 flex items-center"
                                                    onClick={() => handleEditHistory(entry)}
                                                >
                                                    <FaEdit className="mr-1" />
                                                </button>
                                                <button
                                                    className="text-red-500"
                                                    onClick={() => {
                                                        setHistoryToDelete(entry._id);
                                                        setShowModal(true);
                                                    }}
                                                >
                                                    <FaTrash />
                                                </button>
                                            </>
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

            {/* Fee Modal for adding/updating fee history */}
            <FeeModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                onSubmit={handleAddHistory}
                onUpdateHistory={handleUpdateHistory}
                feeHistory={selectedHistory}
            />

            {/* Confirmation Modal for delete action */}
            <ConfirmationModal
                show={showModal}
                onHide={handleConfirmationClose}
                onConfirm={confirmDelete}
            />
      </>
    );
}
export default FeeHistoryList
