import React, { useEffect, useState, useCallback } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import PostCard from '../../Components/PostCard/PostCard';
import CreatePost from '../../Components/CreatePost/CreatePost';
import Fab from '@mui/material/Fab';
import {MdAdd} from 'react-icons/md';
import { fetchUserAllPosts } from '../../API/Posts';
import { useParams } from 'react-router';
import Loading from '../../Components/Loading';
import "../../pageStyles/myPosts.css"

const MyPosts = () => {
    const params = useParams()
    const [createPostStatus, setCreatePostStatus] = useState(false)
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    const getAllUserPost = useCallback(async ()=>{
        const Posts = await fetchUserAllPosts(params.userId)
        setPosts(Posts)
        setLoading(false)
    }, [params.userId])

    useEffect(()=>{
        getAllUserPost()
    }, [getAllUserPost, createPostStatus])

    return loading ? <Loading /> : (
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
            {
                posts?.length === 0 ?
                <>
                    <div className='noPosts'>
                        <h2>You don't have any posts yet</h2>
                        <h3>Start creating</h3>
                    </div>
                </>
                : (
                    <>
                    <Row className='gy-4'>
                        {/* <div className='eachCol'> */}
                            {
                                posts?.map((value, i)=>(
                                    // <div className='keepTogether' key={i}>
                                        <Col key={i} lg={6}  >
                                        <PostCard  postDetails={value} reloadFun={getAllUserPost} />
                                        </Col>
                                    // {/* </div> */}
                                ))
                            }
                    
                        {/* </div> */}
                    </Row>
                    </>
                )
            }
            </Container>
        </div>
    )
};

export default MyPosts;
