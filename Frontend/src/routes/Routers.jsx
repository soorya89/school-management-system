import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../components/Login/Login';
import AdminDashboard from '../pages/Dashboards/AdminDashboard';
import User from '../components/sidemenu/Users';
import Student from '../components/sidemenu/Student';
import LibraryHistory from '../components/sidemenu/LibraryHistory';
import FeeHistory from '../components/sidemenu/FeeHistory';
import OfficeStaffDashboard from '../pages/Dashboards/OfficeStaffDashboard';
import { useSelector } from 'react-redux'; // Import useSelector

// ProtectedRoute component to manage access based on roles
const ProtectedRoute = ({ children, role, requiredRole }) => {
    if (role !== requiredRole) {
        return <Navigate to="/" />;
    }
    return children;
};

const Routers = () => {
    const { userInfo } = useSelector((state) => state.auth); // Get userInfo from the Redux store
    const role = userInfo?.user?.role; // Extract the user role

    return (
        <Routes>
            <Route path='/' element={<Login />} />

            {/* Admin Routes */}
            <Route path='/admin/dashboard' element={<ProtectedRoute role={role} requiredRole="admin"><AdminDashboard /></ProtectedRoute>} />
            <Route path='/admin/users' element={<ProtectedRoute role={role} requiredRole="admin"><User /></ProtectedRoute>} />
            <Route path='/admin/students' element={<ProtectedRoute role={role} requiredRole="admin"><Student /></ProtectedRoute>} />
            <Route path='/admin/library' element={<ProtectedRoute role={role} requiredRole="admin"><LibraryHistory /></ProtectedRoute>} />
            <Route path='/admin/fees' element={<ProtectedRoute role={role} requiredRole="admin"><FeeHistory /></ProtectedRoute>} />

            {/* Office Staff Routes */}
            <Route path='/staff' element={<ProtectedRoute role={role} requiredRole="officeStaff"><OfficeStaffDashboard /></ProtectedRoute>} />
            <Route path='/staff/students' element={<ProtectedRoute role={role} requiredRole="officeStaff"><Student /></ProtectedRoute>} />
            <Route path='/staff/fees' element={<ProtectedRoute role={role} requiredRole="officeStaff"><FeeHistory /></ProtectedRoute>} />
            <Route path='/staff/library' element={<ProtectedRoute role={role} requiredRole="officeStaff"><LibraryHistory /></ProtectedRoute>} />

            {/* Librarian Routes */}
            <Route path='/librarian' element={<ProtectedRoute role={role} requiredRole="librarian"><OfficeStaffDashboard /></ProtectedRoute>} />
            <Route path='/librarian/students' element={<ProtectedRoute role={role} requiredRole="librarian"><Student /></ProtectedRoute>} />
            <Route path='/librarian/fees' element={<ProtectedRoute role={role} requiredRole="librarian"><FeeHistory /></ProtectedRoute>} />
            <Route path='/librarian/library' element={<ProtectedRoute role={role} requiredRole="librarian"><LibraryHistory /></ProtectedRoute>} />
        </Routes>
    );
}

export default Routers;
