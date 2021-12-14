import React, {useState} from 'react'
import {Container, Button, InputGroup} from "react-bootstrap"
import { useNavigate } from 'react-router';
import { login } from '../../API/Auththentication';
const Login = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
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
    const handleSubmit = async (e)=>{
        e.preventDefault();
        console.log(user);
       const temp = await login(user);
       if(temp){
            navigate("/dashboard")
       }
    }
    return (
        <>
            <Container>
                <form id="registerForm" onSubmit={handleSubmit}>
                    <input type="text" placeholder='Email' name="email" value={user.name} onChange={handleChange} />
                    <input type="password" placeholder='Password' name="password" value={user.password} onChange={handleChange} />
                    <Button color='primary' type='submit' >Submit</Button>
                </form>
            </Container>
        </>
    )
}

export default Login
