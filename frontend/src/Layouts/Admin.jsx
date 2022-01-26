import React from 'react'
import { Navigate, Route, Routes } from 'react-router'
import NavBar from '../Components/Navbar/Navbar'
import Dashboard from '../Pages/Admin/Dashboard'
import MyPosts from '../Pages/Admin/MyPosts'
import Profile from '../Pages/Admin/Profile'
const Admin = () => {
    return (
        <>
            <NavBar />
            <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/myPosts" element={<MyPosts />} />
                    <Route path="/profile/:userid" element={<Profile />} />
                    <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
        </>
    )
}

export default Admin
