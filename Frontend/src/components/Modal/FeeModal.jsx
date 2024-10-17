import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { feeHistoryUpdateAction,addNewFeeHistoryAction } from "../../redux/actions/feeAction";

const FeeModal = ({ isOpen, onClose, onSubmit, onUpdateHistory, feeHistory }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    studentID: "",
    feeType: "",
    amount: "",
    paymentDate: "",
    status: "paid", 
  });

  useEffect(() => {
    if (isOpen && feeHistory) {
      setFormData({
        studentID: feeHistory.studentID,
        feeType: feeHistory.feeType,
        amount: feeHistory.amount,
        paymentDate: feeHistory.paymentDate || "",
        status: feeHistory.status,
      });
    } else {
      setFormData({
        studentID: "",
        feeType: "",
        amount: "",
        paymentDate: "",
        status: "paid",
      });
    }
  }, [isOpen, feeHistory]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (feeHistory) {
      const updatedHistory = await dispatch(feeHistoryUpdateAction(feeHistory._id, formData));
      onUpdateHistory(updatedHistory);
    } else {
      const newHistory = await dispatch(addNewFeeHistoryAction(formData));
      onSubmit(newHistory);
    }

    onClose();
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-white rounded-lg shadow-md p-6 w-96">
          <h2 className="text-xl font-bold mb-4">{feeHistory ? "Edit Library Entry" : "Add Library Entry"}</h2>
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
              <label className="block text-gray-700 mb-1">Fee Type</label>
              <select
                name="feeType"
                onChange={handleChange}
                value={formData.feeType}
                className="border rounded-lg p-2 w-full"
                required
              >
                <option value="">Select</option>
                <option value="Tuition">Tuition</option>
                <option value="Library">Library</option>
                <option value="Lab">Lab</option>
                <option value="Sports">Sports</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Amount</label>
              <input
                type="text"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="border rounded-lg p-2 w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Payment Date</label>
              <input
                type="date"
                name="paymentDate"
                value={formData.paymentDate.split('T')[0]} 
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
                <option value="">Select</option>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
                <option value="Overdue">Overdue</option>
              </select>
            </div>

            <div className="flex justify-end">
              <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                {feeHistory ? "Update" : "Add"}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default FeeModal;
