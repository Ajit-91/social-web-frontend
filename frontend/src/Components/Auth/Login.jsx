import React, {useState} from 'react'
import { Container, Button } from "react-bootstrap"
import {Link} from "react-router-dom"
import { useDispatch } from "react-redux";
import { SET_USER } from '../../Redux/Slices/userSlice';
// import { useNavigate } from 'react-router';
import { login } from '../../API/Auththentication';
const Login = () => {

const  dispatch = useDispatch()

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
       const data = await login(user);
       console.log(data)
       if(data){
           alert("welecome "+data?.name)
           localStorage.setItem("user", JSON.stringify(data._id));
           dispatch(SET_USER(data))
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
                <br/>
                <Link to="/register">create account</Link>
            </Container>
        </>
    )
}

export default Login
