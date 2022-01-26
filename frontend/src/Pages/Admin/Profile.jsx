import React, { useState } from 'react';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import Avatar from '@mui/material/Avatar';
import FileUpload from '../../Components/FileUpload/FileUpload';
import ProfileForm from '../../Components/profileForm/ProfileForm';
import "../../pageStyles/profile.css"
import { useRef } from 'react';
import { Link } from "react-router-dom"

const Profile = () => {
    const [previewImage, setPreviewImage] = useState("")
    const inputRef = useRef(null)

    return (
        <div >
            <Container className='mb-5'>
            <Row className="gy-4">
                <Col lg={4}>
                <Card className="shadow-lg py-3 leftCard">
                    <Card.Body>
                        <FileUpload ref={inputRef} setPreviewImage={setPreviewImage} />
                        <Row className='gy-3'>
                            <Col className='imgRow' >
                            <Avatar
                                src={previewImage}
                                variant='circular'
                                style={{cursor : "pointer"}}
                                onClick={() => inputRef.current.click()}
                                sx={{ width: 200, height: 200 }}
                                alt="profile image"
                            />
                            <h3 className='mt-4'>UserName</h3>
                            </Col>
                            <Col className='imgRow'>
                                <Button variant="primary" size="lg" className='followBtn'>
                                    Follow
                                </Button>
                                <div className='userDetails'>
                                    <div className='atomicDetail'>
                                        <h2>43</h2>
                                        <small>Posts</small>
                                    </div>
                                    <div className='atomicDetail'>
                                        <h2>43</h2>
                                        <small>Followers</small>
                                    </div>
                                    <div className='atomicDetail'>
                                        <h2>43</h2>
                                        <small>Following</small>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
                </Col>
                {/* Right col */}
                <Col lg={8}>
                    <ProfileForm />
                </Col>
            </Row>
            <div style={{textAlign : "center",  display : "block"}}>
                <Link to="/myPosts" >See all posts</Link>
            </div>
            </Container>
        </div>
    )
};

export default Profile;
