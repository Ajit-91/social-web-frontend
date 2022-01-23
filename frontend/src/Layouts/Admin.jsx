import React from 'react'
import { Navigate, Route, Routes } from 'react-router'
import Dashboard from '../Pages/Admin/Dashboard'
import NavBar from '../Components/Navbar/Navbar'
const Admin = () => {
    return (
        <>
            <NavBar />
            <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="*" element={<Navigate to="/dashboard" />} />

            </Routes>
        </>
    )
}

export default Admin
