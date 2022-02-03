import React from 'react'
import { Routes, Route, Navigate } from 'react-router'
import Login from '../Pages/Auth/Login'
import Register from '../Pages/Auth/Register'
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
