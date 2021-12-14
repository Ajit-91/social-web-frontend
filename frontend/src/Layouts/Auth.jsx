import React from 'react'
import { Routes, Route, Navigate } from 'react-router'
import Login from '../Components/Auth/Login'
import Register from '../Components/Auth/Register'
import Dashboard from '../Components/Admin/Dashboard'
const Auth = () => {
    return (
        <>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </>
    )
}

export default Auth
