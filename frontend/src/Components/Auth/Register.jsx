import React, {useState} from 'react'
import "../../css/register.css"
import {Container, Button, InputGroup} from "react-bootstrap"
import { register } from '../../API/Auththentication'

const Register = () => {
    const [user, setUser] = useState({
        name : "",
        email : "",
        password : ""
    });

    const handleChange = (e)=>{
        const {name, value} = e.target;
        setUser((prev)=>{
            return{
            ...prev,
            [name]: value
            }
        })
    }
    const handleSubmit =  (e)=>{
        e.preventDefault();
        console.log(user);
        register(user);
    }
    return (
        <>
            <Container>
                <form id="registerForm" onSubmit={handleSubmit}>
                    <input type="text" placeholder='Name' name="name" value={user.name} onChange={handleChange} />
                    <input type="text" placeholder='Email' name="email" value={user.email} onChange={handleChange} />
                    <input type="password" placeholder='Password' name="password" value={user.password} onChange={handleChange} />
                    <Button color='primary' type='submit' >Submit</Button>
                </form>
            </Container>
        </>
    )
}

export default Register
