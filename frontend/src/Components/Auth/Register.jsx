import React, { useState } from 'react'
import "../../css/register.css"
import { Container, Button } from "react-bootstrap"
import {Link} from "react-router-dom"
import { SET_USER } from '../../Redux/Slices/userSlice'
import { useDispatch } from "react-redux";
import { register } from '../../API/Auththentication'

const Register = () => {

    const dispatch = useDispatch();
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user);
        const data = await register(user);
        if (data) {
            localStorage.setItem("user", JSON.stringify(data._id));
            dispatch(SET_USER(data))
        }
    }
    return (
        <>
            <Container>
                <form id="registerForm" onSubmit={handleSubmit}>
                    <input type="text" placeholder='Name' name="name" value={user.name} onChange={handleChange} />
                    <input type="text" placeholder='Email' name="email" value={user.email} onChange={handleChange} />
                    <input type="password" placeholder='Password' name="password" value={user.password} onChange={handleChange} />
                    <br/>
                    <Button color='primary' type='submit' >Submit</Button>
                    <br/>
                <Link to="/login">Login </Link>
                </form>
            </Container>
        </>
    )
}

export default Register
