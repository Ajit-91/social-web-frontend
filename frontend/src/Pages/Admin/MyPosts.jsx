import React, { useEffect, useState, useCallback } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import PostCard from '../../Components/PostCard/PostCard';
import CreatePost from '../../Components/CreatePost/CreatePost';
import Fab from '@mui/material/Fab';
import {MdAdd} from 'react-icons/md';
import { fetchUserAllPosts } from '../../API/Posts';
import { useParams } from 'react-router';
import "../../pageStyles/myPosts.css"

const MyPosts = () => {
    const params = useParams()
    console.log(params)
    const [createPostStatus, setCreatePostStatus] = useState(false)
    const [posts, setPosts] = useState([])
    console.log("post status",createPostStatus)

    const getAllUserPost = useCallback(async ()=>{
        const Posts = await fetchUserAllPosts(params.userId)
        setPosts(Posts)
    }, [params.userId])

    useEffect(()=>{
        getAllUserPost()
    }, [getAllUserPost])

    return (
        <div className='main'>
            <CreatePost createPostStatus={createPostStatus} setCreatePostStatus={setCreatePostStatus} />
       
            <Container className='mb-5  position-relative'>
            {
                params?.userId === JSON.parse(localStorage.getItem("user")) && (
                    <Fab 
                        color='primary' 
                        className="createPostBtn" 
                        onClick={()=>setCreatePostStatus(true)}
                    >
                        <MdAdd size={25} />
                    </Fab>
                    )
            }
                <Row className='gy-4'>
                    {
                        posts?.map((value, i)=>(
                        <Col lg={6} key={i}>
                            <PostCard  postDetails={value} reloadFun={getAllUserPost} />
                        </Col>
                        ))
                    }
               
                </Row>
            </Container>
        </div>
    )
};

export default MyPosts;