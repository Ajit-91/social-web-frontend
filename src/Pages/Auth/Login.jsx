import React, { useState } from 'react'
import { Container, Button, Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux";
import { SET_USER } from '../../Redux/Slices/userSlice';
import { login } from '../../API/Auththentication';
import TextField from '@mui/material/TextField';
import Alerts from "../../Components/Alerts"
import { Spinner } from 'react-bootstrap';

const Login = () => {

    const dispatch = useDispatch()

    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const [showAlert, setShowAlert] = useState(false)
    const [msg, setMsg] = useState("")
    const [alertType, setAlertType] = useState("")
    const [disabled, setDisabled] = useState(false)

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
        setDisabled(true)
        if(!user?.email || !user?.password){
            setMsg("One or more fields are required")
            setAlertType("warning")
            setShowAlert(true)
            setDisabled(false)
            return
        }
        const data = await login(user);
        if (data?.msg==="success") {
            localStorage.setItem("user", JSON.stringify(data?.resp?._id));
            dispatch(SET_USER(data?.resp))
            setDisabled(false)
        }else if(data?.msg !=="success" && !data?.resp){
            setMsg(`${data?.msg}`)
            setAlertType("info")
            setShowAlert(true)
            setDisabled(false)
        }else{
            setMsg("something went wrong")
            setAlertType("error")
            setShowAlert(true)
            setDisabled(false)
        }
    }
    return (
        <>
            <Container className='formContainer'>
         <Alerts open={showAlert}  setOpen={setShowAlert} type={alertType} msg={msg} />
                <Card className='bg-white shadow-lg formCard '>
                    <Card.Body>
                        <form id="registerForm" onSubmit={handleSubmit}>
                            <p className='text-muted text-center m-0'>Login</p>
                            {/* <hr /> */}
                            <TextField
                                label="Email"
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                name='email'
                                value={user.email}
                                onChange={handleChange} />
                            <TextField
                                label="Password"
                                fullWidth
                                margin="normal"
                                type='password'
                                variant="outlined"
                                name='password'
                                value={user.password}
                                onChange={handleChange}
                            />

                            <Button variant='outline-primary' type='submit' className='mt-3 align-tems-center' disabled={disabled} >
                                {
                                    disabled &&(
                                        <>
                                            <Spinner
                                            as="span"
                                            animation="border"
                                            style={{borderWidth : '2px'}}
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                            />
                                            &nbsp;
                                        </>
                                    )
                                }
                                 Login
                            </Button>
                            <br />
                        </form>
                        <div className='text-center'>
                            <p className='text-muted'>Don't have Account ?</p>
                            <Link to="/register" className='text-muted'>Register</Link>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}

export default Login
