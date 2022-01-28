import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import PostCard from '../../Components/PostCard/PostCard';
import CreatePost from '../../Components/CreatePost/CreatePost';
import Fab from '@mui/material/Fab';
import {MdAdd} from 'react-icons/md';
import { fetchUserAllPosts } from '../../API/Posts';
import { useNavigate, useParams } from 'react-router';
import "../../pageStyles/myPosts.css"

const MyPosts = () => {
    // const navigate = useNavigate()
    const params = useParams()
    console.log(params)
    const [createPostStatus, setCreatePostStatus] = useState(false)
    const [posts, setPosts] = useState([])
    console.log("post status",createPostStatus)

    useEffect(()=>{
        const getAllUserPost = async ()=>{
            const Posts = await fetchUserAllPosts(params.userId)
            setPosts(Posts)
            console.log("posts",posts)
        }
 
        getAllUserPost()
    }, [])
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
                    {
                        posts?.map((value, i)=>(
                        <Col lg={6} className='d-flex justify-content-center' key={i}>
                            <PostCard width={450} postDetails={value} />
                        </Col>
                        ))
                    }
               
                </Row>
            </Container>
        </div>
    )
};

export default MyPosts;
