import React, { useState, useRef } from 'react';
import { Card, Row, Col, Form, Modal, Button } from 'react-bootstrap';
import FileUpload from '../FileUpload/FileUpload';
import Avatar from '@mui/material/Avatar';
import {updateProfileApi} from "../../API/Auththentication"
import { SET_USER } from "../../Redux/Slices/userSlice"
import { useDispatch } from 'react-redux';
import {MdEdit, MdDelete} from "react-icons/md"
import { IconButton } from '@mui/material';
import {RiSave3Line} from "react-icons/ri"
import Alerts from '../Alerts';
import { Spinner } from 'react-bootstrap';
import "../../pageStyles/profile.css"

const UpdateProfileForm = ({updateProfile ,setUpdateProfile, localUser}) => {
    const dispatch = useDispatch()
    const inputRef = useRef(null)
    const [previewImage, setPreviewImage] = useState(localUser?.profileImg)
    const [imgDetails, setImgDetails] = useState(null)
    const [currentDetails, setCurrentDetails] = useState(localUser)
    const [showAlert, setShowAlert] = useState(false)
    const [msg, setMsg] = useState("")
    const [alertType, setAlertType] = useState("")
    const [disabled, setDisabled] = useState(false)
    
    const handleChange = (e)=>{
        const {name, value} = e.target
        setCurrentDetails(prev=>{
          return {
            ...prev,
            [name] : value
          }
        })
    }

    const handleHide = ()=>{
        setCurrentDetails(localUser)
        setUpdateProfile(false)
        setImgDetails(null)
        setPreviewImage(localUser?.profileImg)
    }

    const handleSubmit = async (e)=>{
        e.preventDefault()
        setDisabled(true)
        if(!currentDetails?.name || !currentDetails?.course || !currentDetails?.college){
            setMsg("One or more fields are required")
            setAlertType("warning")
            setShowAlert(true)
            setDisabled(false)
            return
        }

        const formData = new FormData()
        formData.append("name", currentDetails?.name)
        formData.append("bio", currentDetails?.bio)
        formData.append("course", currentDetails?.course)
        formData.append("college", currentDetails?.college)
        if(imgDetails !== null) formData.append("profileImg", imgDetails)

        const response = await updateProfileApi(formData, localUser._id)
        if(response?.msg==="success"){
            dispatch(SET_USER(response?.resp))
            setUpdateProfile(false)
            setMsg("Saved Changes")
            setAlertType("success")
            setShowAlert(true)
            setDisabled(false)
        }else{
            setMsg("Something went wrong")
            setAlertType("error")
            setShowAlert(true)
            setDisabled(false)
        }
    }

    return (
        <div>
         <Alerts open={showAlert}  setOpen={setShowAlert} type={alertType} msg={msg} />
            <Modal
                size='lg'
                centered
                show = {updateProfile}
                onHide = {handleHide}
            >
                <Modal.Header closeButton>
                    Update Profile
                </Modal.Header>
                <Modal.Body>
                <Card className=" py-3 rightCard mb-5">
                    <Card.Body >
                        <Form onSubmit={handleSubmit} >
                            <FileUpload ref={inputRef} setPreviewImage={setPreviewImage} setImgDetails={setImgDetails} />
                            <div className='profilePic'>
                                <div className='picOptions'>
                                    <IconButton 
                                        color='inherit' 
                                        onClick={() => inputRef.current.click()}
                                    >
                                        <MdEdit 
                                            size={25} 
                                            style={{cursor : "pointer"}}
                                            color='white'
                                        />
                                    </IconButton>
                                    
                                    <IconButton color='inherit'
                                            onClick={() => {
                                            setImgDetails("")
                                            setPreviewImage("")
                                        }}
                                    >
                                        <MdDelete 
                                            size={25} 
                                            style={{cursor : "pointer"}}
                                            color='white'
                                        />
                                    </IconButton>
                                </div>
                            <Avatar
                                src={previewImage}
                                variant='circular'
                                sx={{ width: 200, height: 200 }}
                                alt="profile image"
                            />
                            </div>
                            <Row>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Bio</Form.Label>
                                    <Form.Control as="textarea" rows={3} className='aboutSection' name='bio' value={currentDetails?.bio} onChange={handleChange} />
                                </Form.Group>

                            </Row>

                            <Row>
                            <Col lg={12}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Name<span style={{color : "red"}}> *</span></Form.Label>
                                        <Form.Control type="text" name="name" value={currentDetails?.name} onChange={handleChange} />
                                    </Form.Group>
                                </Col>

                                <Col lg={12}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" name="email" value={currentDetails?.email} disabled />
                                    </Form.Group>
                                </Col>

                                <Col lg={12}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Course<span style={{color : "red"}}> *</span></Form.Label>
                                        <Form.Control type="text" name="course" value={currentDetails?.course} onChange={handleChange} />
                                    </Form.Group>
                                </Col>

                                <Col lg={12}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>College<span style={{color : "red"}}> *</span></Form.Label>
                                        <Form.Control type="text" name="college" value={currentDetails?.college} onChange={handleChange} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Button type="submit" variant='outline-primary' className="saveBtn d-flex align-items-center" disabled={disabled} >
                                {
                                    disabled ?
                                        <>
                                               <Spinner
                                                    as="span"
                                                    animation="grow"
                                                    size="sm"
                                                    role="status"
                                                    aria-hidden="true"
                                                />
                                                &nbsp; Saving ...
                                        </>
                                        : (
                                            <>
                                            Save Changes &nbsp;<RiSave3Line />
                                            </>
                                        )
                                }
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>      
                </Modal.Body>
            </Modal>
        </div>
    )
};

export default UpdateProfileForm;
