import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import PostCard from '../../Components/PostCard/PostCard';
import CreatePost from '../../Components/CreatePost/CreatePost';
import Fab from '@mui/material/Fab';
import {MdAdd} from 'react-icons/md';
// import { useNavigate } from 'react-router';
import "../../pageStyles/myPosts.css"

const MyPosts = () => {
    // const navigate = useNavigate()
    const [createPostStatus, setCreatePostStatus] = useState(false)
    console.log("post status",createPostStatus)
    return (
        <div className='main'>
            <CreatePost createPostStatus={createPostStatus} setCreatePostStatus={setCreatePostStatus} />
            <Container className='mb-5 bg-white position-relative'>
                <Fab 
                    color='primary' 
                    className="createPostBtn" 
                    onClick={()=>setCreatePostStatus(true)}
                >
                    <MdAdd size={25} />
                </Fab>
                <Row>
                    <Col className='d-flex justify-content-center'>
                        <PostCard width={450} />
                    </Col>
                    <Col className='d-flex justify-content-center'>
                        <PostCard width={450} />
                    </Col>
                </Row>
                <Row>
                    <Col className='d-flex justify-content-center'>
                        <PostCard width={450} />
                    </Col>
                    <Col className='d-flex justify-content-center'>
                        <PostCard width={450} />
                    </Col>
                </Row>
            </Container>
        </div>
    )
};

export default MyPosts;
