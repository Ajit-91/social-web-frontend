import React from 'react'
import { Routes, Route, Navigate } from 'react-router'
import Login from '../Components/Auth/Login'
import Register from '../Components/Auth/Register'
const Auth = () => {
    return (
        <>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </>
    )
}

export default Auth
