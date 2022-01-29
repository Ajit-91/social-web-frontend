import React, { useState, useEffect } from 'react'
import PostCard from '../../Components/PostCard/PostCard';
import { fetchAllPosts } from '../../API/Posts';
import FileUpload from '../../Components/FileUpload/FileUpload';
import "../../pageStyles/dashboard.css"
import { Container, Row, Col } from 'react-bootstrap';
const Dashboard = () => {
    // const [previewImage, setPreviewImage] = useState('')
    const [posts, setPosts] = useState([])

    const getAllUserPost = async ()=>{
        const Posts = await fetchAllPosts()
        setPosts(Posts)
        console.log("posts",posts)
    }
    useEffect(()=>{
        getAllUserPost()
    }, [])
    return (
        <Container >
            <Row className='main'>
                <Col lg={7}>
                    { 
                        posts?.map((value, i)=>(
                        <>
                            <PostCard  postDetails={value} key={i} getAllUserPost={getAllUserPost} />
                            <br/>
                        </>
                        ))
                    }
                </Col>
            </Row>
        </Container>
    )
}

export default Dashboard;
