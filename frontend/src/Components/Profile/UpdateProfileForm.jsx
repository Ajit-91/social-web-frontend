import React, { useState, useRef } from 'react';
import { Card, Row, Col, Form, Modal, Button } from 'react-bootstrap';
import FileUpload from '../FileUpload/FileUpload';
import Avatar from '@mui/material/Avatar';
import {updateProfileApi} from "../../API/Auththentication"
import { SET_USER } from "../../Redux/Slices/userSlice"
import "../../pageStyles/profile.css"
import { useDispatch } from 'react-redux';

const UpdateProfileForm = ({updateProfile ,setUpdateProfile, localUser}) => {
    const dispatch = useDispatch()
    const inputRef = useRef(null)
    const [previewImage, setPreviewImage] = useState(localUser?.profileImg)
    const [imgDetails, setImgDetails] = useState()
    const [currentDetails, setCurrentDetails] = useState(localUser)
    
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
        setImgDetails("")
        setPreviewImage("")
    }

    const handleSubmit = async (e)=>{
        e.preventDefault()

        const formData = new FormData()
        formData.append("name", currentDetails?.name)
        formData.append("bio", currentDetails?.bio)
        formData.append("profileImg", imgDetails)
        formData.append("course", currentDetails?.course)
        formData.append("college", currentDetails?.college)

        const newDetails = await updateProfileApi(formData, localUser._id)
        if(newDetails) dispatch(SET_USER(newDetails))
        setUpdateProfile(false)
    }

    console.log("img",imgDetails)
    return (
        <div>
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
                            <Avatar
                                src={previewImage}
                                variant='circular'
                                style={{ cursor: "pointer", margin : "0 auto" }}
                                onClick={() => inputRef.current.click()}
                                sx={{ width: 200, height: 200 }}
                                alt="profile image"
                            />
                            <Row>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Bio</Form.Label>
                                    <Form.Control as="textarea" rows={3} className='aboutSection' name='bio' value={currentDetails?.bio} onChange={handleChange} />
                                </Form.Group>

                            </Row>

                            <Row>
                            <Col lg={12}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Name</Form.Label>
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
                                        <Form.Label>Course</Form.Label>
                                        <Form.Control type="text" name="course" value={currentDetails?.course} onChange={handleChange} />
                                    </Form.Group>
                                </Col>

                                <Col lg={12}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>College</Form.Label>
                                        <Form.Control type="text" name="college" value={currentDetails?.college} onChange={handleChange} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Button type="submit" variant='success' className="saveBtn" >Save Changes</Button>
                        </Form>
                    </Card.Body>
                </Card>      
                </Modal.Body>
            </Modal>
        </div>
    )
};

export default UpdateProfileForm;
