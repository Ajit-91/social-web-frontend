import React, { useState, useEffect, useCallback } from 'react'
import PostCard from '../../Components/PostCard/PostCard';
import { fetchAllPosts } from '../../API/Posts';
import { Container, Row, Col } from 'react-bootstrap';
import Loading from "../../Components/Loading"
import "../../pageStyles/home.css"

const Home = () => {
    const [posts, setPosts] = useState([])
    const [loading, setReloading] = useState(true)

    const getAllUserPost = useCallback(async ()=>{
        const Posts = await fetchAllPosts(JSON.parse(localStorage.getItem("user")))
        setPosts(Posts)
        setReloading(false)
    }, [])
    
    useEffect(()=>{
        getAllUserPost()
    }, [getAllUserPost])

    return loading ? <Loading /> :  (
        <Container >
            <Row className='main'>
                <Col lg={7}>
                    { 
                        posts?.map((value, i)=>(
                        <div key={i}>
                            <PostCard  postDetails={value} reloadFun={getAllUserPost} />
                            <br/>
                        </div>
                        ))
                    }
                </Col>
            </Row>
        </Container>
    )
}

export default Home;
