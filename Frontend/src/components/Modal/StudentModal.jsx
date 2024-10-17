import React, { useState, useEffect } from 'react';
import { studentUpdateAction, addNewStudentAction } from '../../redux/actions/studentAction';
import { useDispatch } from "react-redux";

const StudentModal = ({ isOpen, onClose, onSubmit, mode, student, onUpdateStudent }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    ID:'',
    name: '',
    dateOfBirth: '',
    gender: '',
    address: {
      house: '',
      city: '',
      state: '',
      zip: ''
    },
    contact: '',
    fatherName: '',
    motherName: '',
    guardian: {
      name: '',
      relation: '',
      phone: ''
    }
  });

  const [errors, setErrors] = useState({}); // State for holding error messages

  useEffect(() => {
    if (mode === 'edit' || mode === 'view') {
      setFormData({
        studentId:student.ID,
        name: student.name,
        dateOfBirth: student.dateOfBirth,
        gender: student.gender,
        address: student.address,
        contact: student.contact,
        fatherName: student.fatherName,
        motherName: student.motherName,
        guardian: student.guardian
      });
    } else {
      setFormData({
        ID:'',
        name: '',
        dateOfBirth: '',
        gender: '',
        address: {
          house: '',
          city: '',
          state: '',
          zip: ''
        },
        contact: '',
        fatherName: '',
        motherName: '',
        guardian: {
          name: '',
          relation: '',
          phone: ''
        }
      });
    }
    setErrors({}); // Reset errors when the modal opens
  }, [mode, student]);

  const validate = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of Birth is required.";
    if (!formData.gender) newErrors.gender = "Gender is required.";
    if (!formData.contact) newErrors.contact = "Contact is required.";
    if (!formData.fatherName) newErrors.fatherName = "Father's Name is required.";
    if (!formData.motherName) newErrors.motherName = "Mother's Name is required.";
    if (!formData.guardian.name) newErrors.guardianName = "Guardian's Name is required.";
    if (!formData.guardian.relation) newErrors.guardianRelation = "Guardian Relation is required.";
    if (!formData.guardian.phone) newErrors.guardianPhone = "Guardian Phone is required.";

    setErrors(newErrors); // Set errors
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('address.')) {
      const addressKey = name.split('.')[1];
      setFormData((prevData) => ({
        ...prevData,
        address: { ...prevData.address, [addressKey]: value }
      }));
    } else if (name.startsWith('guardian.')) {
      const guardianKey = name.split('.')[1];
      setFormData((prevData) => ({
        ...prevData,
        guardian: { ...prevData.guardian, [guardianKey]: value }
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return; 

    if (student) {
      const updatedStudent = await dispatch(studentUpdateAction(student._id, formData));
      onUpdateStudent(updatedStudent);
      onClose();
    } else {
      const newStudent = await dispatch(addNewStudentAction(formData));
      onSubmit(newStudent);
      onClose();
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50" onClick={onClose}>
        <div className="bg-white rounded-lg shadow-md p-6 w-3/4 max-w-3xl" onClick={(e) => e.stopPropagation()}>
          <div className="flex justify-between items-center bg-gray-200 text-gray-700 px-4 py-2 rounded-t-lg">
            <h4 className="text-xl font-semibold ">
              {mode === 'view' ? 'View Student' : mode === 'edit' ? 'Edit Student' : 'Add Student'}
            </h4>
          </div>

          {mode !== 'view' ? (
            <form className="grid grid-cols-2 gap-4 mt-4" onSubmit={handleSubmit}>
                <div>
                <label htmlFor="inputID" className="block text-gray-700">StudentId</label>
                <input
                  type="text"
                  id="inputID"
                  name="ID"
                  placeholder="Enter studentId"
                  className={`border rounded-lg p-2 w-full ${errors.studentId? 'border-red-500' : ''}`}
                  onChange={handleChange}
                  value={formData.ID}
                  required
                />
                
              </div>
              <div>
                <label htmlFor="inputName" className="block text-gray-700">Name</label>
                <input
                  type="text"
                  id="inputName"
                  name="name"
                  placeholder="Enter Name"
                  className={`border rounded-lg p-2 w-full ${errors.name ? 'border-red-500' : ''}`}
                  onChange={handleChange}
                  value={formData.name}
                  required
                />
                {errors.name && <p className="text-red-500">{errors.name}</p>}
              </div>

              {/* Date of Birth */}
              <div>
                <label htmlFor="inputDateOfBirth" className="block text-gray-700">Date of Birth</label>
                <input
                  type="date"
                  id="inputDateOfBirth"
                  name="dateOfBirth"
                  className={`border rounded-lg p-2 w-full ${errors.dateOfBirth ? 'border-red-500' : ''}`}
                  onChange={handleChange}
                  value={formData.dateOfBirth}
                  required
                />
                {errors.dateOfBirth && <p className="text-red-500">{errors.dateOfBirth}</p>}
              </div>

              {/* Gender */}
              <div>
                <label htmlFor="inputGender" className="block text-gray-700">Gender</label>
                <select
                  id="inputGender"
                  name="gender"
                  className={`border rounded-lg p-2 w-full ${errors.gender ? 'border-red-500' : ''}`}
                  onChange={handleChange}
                  value={formData.gender}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.gender && <p className="text-red-500">{errors.gender}</p>}
              </div>

              {/* Address */}
              <div className="col-span-2">
                <label className="block text-gray-700">Address</label>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  {/* House */}
                  <div>
                    <label htmlFor="inputHouse" className="block text-gray-700">House</label>
                    <input
                      type="text"
                      id="inputHouse"
                      name="address.house"
                      placeholder="Enter House"
                      className={`border rounded-lg p-2 w-full ${errors.house ? 'border-red-500' : ''}`}
                      onChange={handleChange}
                      value={formData.address.house}
                      required
                    />
                    {errors.house && <p className="text-red-500">{errors.house}</p>}
                  </div>

                  {/* City */}
                  <div>
                    <label htmlFor="inputCity" className="block text-gray-700">City</label>
                    <input
                      type="text"
                      id="inputCity"
                      name="address.city"
                      placeholder="Enter City"
                      className={`border rounded-lg p-2 w-full ${errors.city ? 'border-red-500' : ''}`}
                      onChange={handleChange}
                      value={formData.address.city}
                      required
                    />
                    {errors.city && <p className="text-red-500">{errors.city}</p>}
                  </div>

                  {/* State */}
                  <div>
                    <label htmlFor="inputState" className="block text-gray-700">State</label>
                    <input
                      type="text"
                      id="inputState"
                      name="address.state"
                      placeholder="Enter State"
                      className={`border rounded-lg p-2 w-full ${errors.state ? 'border-red-500' : ''}`}
                      onChange={handleChange}
                      value={formData.address.state}
                      required
                    />
                    {errors.state && <p className="text-red-500">{errors.state}</p>}
                  </div>

                  {/* Zip */}
                  <div>
                    <label htmlFor="inputZip" className="block text-gray-700">Zip</label>
                    <input
                      type="text"
                      id="inputZip"
                      name="address.zip"
                      placeholder="Enter Zip"
                      className={`border rounded-lg p-2 w-full ${errors.zip ? 'border-red-500' : ''}`}
                      onChange={handleChange}
                      value={formData.address.zip}
                      required
                    />
                    {errors.zip && <p className="text-red-500">{errors.zip}</p>}
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div>
                <label htmlFor="inputContact" className="block text-gray-700">Contact</label>
                <input
                  type="text"
                  id="inputContact"
                  name="contact"
                  placeholder="Enter Contact Number"
                  className={`border rounded-lg p-2 w-full ${errors.contact ? 'border-red-500' : ''}`}
                  onChange={handleChange}
                  value={formData.contact}
                  required
                />
                {errors.contact && <p className="text-red-500">{errors.contact}</p>}
              </div>

              {/* Father's Name */}
              <div>
                <label htmlFor="inputFatherName" className="block text-gray-700">Father's Name</label>
                <input
                  type="text"
                  id="inputFatherName"
                  name="fatherName"
                  placeholder="Enter Father's Name"
                  className={`border rounded-lg p-2 w-full ${errors.fatherName ? 'border-red-500' : ''}`}
                  onChange={handleChange}
                  value={formData.fatherName}
                  required
                />
                {errors.fatherName && <p className="text-red-500">{errors.fatherName}</p>}
              </div>

              {/* Mother's Name */}
              <div>
                <label htmlFor="inputMotherName" className="block text-gray-700">Mother's Name</label>
                <input
                  type="text"
                  id="inputMotherName"
                  name="motherName"
                  placeholder="Enter Mother's Name"
                  className={`border rounded-lg p-2 w-full ${errors.motherName ? 'border-red-500' : ''}`}
                  onChange={handleChange}
                  value={formData.motherName}
                  required
                />
                {errors.motherName && <p className="text-red-500">{errors.motherName}</p>}
              </div>

              {/* Guardian Details */}
              <div className="col-span-2">
                <h4 className="block text-gray-700 font-semibold">Guardian</h4>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <label htmlFor="inputGuardianName" className="block text-gray-700">Guardian Name</label>
                    <input
                      type="text"
                      id="inputGuardianName"
                      name="guardian.name"
                      placeholder="Enter Guardian's Name"
                      className={`border rounded-lg p-2 w-full ${errors.guardianName ? 'border-red-500' : ''}`}
                      onChange={handleChange}
                      value={formData.guardian.name}
                      required
                    />
                    {errors.guardianName && <p className="text-red-500">{errors.guardianName}</p>}
                  </div>

                  <div>
                    <label htmlFor="inputGuardianRelation" className="block text-gray-700">Relation</label>
                    <input
                      type="text"
                      id="inputGuardianRelation"
                      name="guardian.relation"
                      placeholder="Enter Relation"
                      className={`border rounded-lg p-2 w-full ${errors.guardianRelation ? 'border-red-500' : ''}`}
                      onChange={handleChange}
                      value={formData.guardian.relation}
                      required
                    />
                    {errors.guardianRelation && <p className="text-red-500">{errors.guardianRelation}</p>}
                  </div>

                  <div>
                    <label htmlFor="inputGuardianPhone" className="block text-gray-700">Guardian Phone</label>
                    <input
                      type="text"
                      id="inputGuardianPhone"
                      name="guardian.phone"
                      placeholder="Enter Guardian's Phone"
                      className={`border rounded-lg p-2 w-full ${errors.guardianPhone ? 'border-red-500' : ''}`}
                      onChange={handleChange}
                      value={formData.guardian.phone}
                      required
                    />
                    {errors.guardianPhone && <p className="text-red-500">{errors.guardianPhone}</p>}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="col-span-2 flex justify-end mt-4">
                <button
                  type="submit"
                  className="bg-gray-700 text-white px-4 py-2 rounded-lg"
                >
                  {mode === 'edit' ? 'Update Student' : 'Add Student'}
                </button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label htmlFor="inputID" className="block text-gray-700">StudentId</label>
                <p className="border rounded-lg p-2 w-full bg-gray-100">{formData.ID}</p>
              </div>
              <div>
                <label htmlFor="inputName" className="block text-gray-700">Name</label>
                <p className="border rounded-lg p-2 w-full bg-gray-100">{formData.name}</p>
              </div>
              <div>
                <label htmlFor="inputDateOfBirth" className="block text-gray-700">Date of Birth</label>
                <p className="border rounded-lg p-2 w-full bg-gray-100">{formData.dateOfBirth}</p>
              </div>
              <div>
                <label htmlFor="inputGender" className="block text-gray-700">Gender</label>
                <p className="border rounded-lg p-2 w-full bg-gray-100">{formData.gender}</p>
              </div>
              <div>
                <label htmlFor="inputContact" className="block text-gray-700">Contact</label>
                <p className="border rounded-lg p-2 w-full bg-gray-100">{formData.contact}</p>
              </div>
              <div>
                <label htmlFor="inputFatherName" className="block text-gray-700">Father's Name</label>
                <p className="border rounded-lg p-2 w-full bg-gray-100">{formData.fatherName}</p>
              </div>
              <div>
                <label htmlFor="inputMotherName" className="block text-gray-700">Mother's Name</label>
                <p className="border rounded-lg p-2 w-full bg-gray-100">{formData.motherName}</p>
              </div>
              <div>
                <label htmlFor="inputGuardianName" className="block text-gray-700">Guardian's Name</label>
                <p className="border rounded-lg p-2 w-full bg-gray-100">{formData.guardian.name}</p>
              </div>
              <div>
                <label htmlFor="inputGuardianRelation" className="block text-gray-700">Relation</label>
                <p className="border rounded-lg p-2 w-full bg-gray-100">{formData.guardian.relation}</p>
              </div>
              <div>
                <label htmlFor="inputGuardianPhone" className="block text-gray-700">Guardian's Phone</label>
                <p className="border rounded-lg p-2 w-full bg-gray-100">{formData.guardian.phone}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default StudentModal;
