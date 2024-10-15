import React from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa"




function Admin() {
  
  return (
    <>
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center bg-primary text-white px-4 py-2 rounded-t-lg">
          <h4 className="text-lg font-semibold">
            Manage <span className="font-bold">Employee</span>
          </h4>
          <Link to="/add-user" className="bg-green-500 text-white px-4 py-2 rounded-lg">
            Add New User
          </Link>
        </div>

        <table className="table-auto w-full mt-4 text-left text-gray-700">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Password</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
           
              <tr  className="border-b">
                <td className="px-4 py-2"></td>
                <td className="px-4 py-2"></td>
                <td className="px-4 py-2">
                 
                </td>
                <td className="px-4 py-2"></td>
                <td className="px-4 py-2"></td>
                <td className="px-4 py-2 flex items-center">
                  <Link to='' className="text-yellow-500 mr-2">
                   <FaEdit  />
                  </Link>
                  <button
                    className="text-red-500 ps-2"
                   
                  >
                   <FaTrash />
                  </button>
                </td>
              </tr>
          
          </tbody>
        </table>
      </div>

      {/* <ConfirmationModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onConfirm={confirmDelete}
      /> */}
    </>
  )
}

export default Admin;
