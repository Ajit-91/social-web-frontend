import React, { useState } from 'react'
import "../../pageStyles/auth.css"
import { Container, Card, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { SET_USER } from '../../Redux/Slices/userSlice'
import { useDispatch } from "react-redux";
import { register } from '../../API/Auththentication'
import TextField from '@mui/material/TextField';
import Alerts from "../../Components/Alerts"
import { Spinner } from 'react-bootstrap'
const Register = () => {

    const dispatch = useDispatch();
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        course: "",
        college: ""
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

        if (!user?.name || !user?.email || !user?.password || !user?.college || !user?.course) {
            setMsg("One or more fields are required")
            setAlertType("warning")
            setShowAlert(true)
            setDisabled(false)
            return
        }

        const data = await register(user);
        if (data?.msg === "success") {
            localStorage.setItem("user", JSON.stringify(data?.resp?._id));
            dispatch(SET_USER(data?.resp))
            setDisabled(false)
        } else if (data?.msg !== "success" && !data?.resp) {
            setMsg(`${data?.msg}`)
            setAlertType("info")
            setShowAlert(true)
            setDisabled(false)
        } else {
            setMsg("something went wrong")
            setAlertType("error")
            setShowAlert(true)
            setDisabled(false)
        }
    }
    return (
        <>
            <Alerts open={showAlert} setOpen={setShowAlert} type={alertType} msg={msg} />
            <Container className='formContainer'>
                <Card className='bg-white shadow-lg formCard '>
                    <Card.Body>
                        <form id="registerForm" onSubmit={handleSubmit}>
                            <p className='text-muted text-center'>Register</p>
                            <TextField
                                label="Name *"
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                name='name'
                                value={user.name}
                                onChange={handleChange}
                            />
                            <TextField
                                label="Email *"
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                name='email'
                                value={user.email}
                                onChange={handleChange} />
                            <TextField
                                label="Password *"
                                fullWidth
                                margin="normal"
                                type='password'
                                variant="outlined"
                                name='password'
                                value={user.password}
                                onChange={handleChange} />
                            <TextField
                                label="College *"
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                name='college'
                                value={user.college}
                                onChange={handleChange} />
                            <TextField
                                label="Course *"
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                name='course'
                                value={user.course}
                                onChange={handleChange} />

                            <Button variant='outline-primary' type='submit' className='mt-3 align-tems-center' disabled={disabled} >
                                {
                                    disabled && (
                                        <>
                                            <Spinner
                                                as="span"
                                                animation="border"
                                                style={{ borderWidth: '2px' }}
                                                size="sm"
                                                role="status"
                                                aria-hidden="true"
                                            />
                                            &nbsp;
                                        </>
                                    )
                                }
                                Register
                            </Button>
                            <br />

                        </form>
                        <div className='text-center '>
                            <p className='text-muted'>Already have Account ?</p>
                            <Link to="/login"> Login </Link>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}

export default Register
