import React from 'react'
import { Navigate, Route, Routes } from 'react-router'
import Dashboard from '../Components/Admin/Dashboard'

const Admin = () => {
    return (
        <>
            <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="*" element={<Navigate to="/dashboard" />} />

            </Routes>
        </>
    )
}

export default Admin
