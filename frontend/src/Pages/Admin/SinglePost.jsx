import React, { useState, useCallback, useEffect } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import { fetchSinglePost } from '../../API/Posts';
import PostInfo from '../../Components/PostCard/PostInfo';
import Comment from '../../Components/Comment/Comment';

const SinglePost = () => {
  const params = useParams()
  const [post, setPost] = useState([])

  const getSinglePost = useCallback(async () =>{
    const resp = await fetchSinglePost(params.postId)
    console.log("singlePost",resp)
    setPost(resp)
  }, [params.postId])

  useEffect(()=>{
    getSinglePost()
  }, [getSinglePost])

  return (
  <>
  <Container className='mb-5'>
      <Row className='gx-4 gy-5'>
        <Col lg={7}>
            <Card>
              <Card.Img src={post?.postImg} />
              <Card.Body>
                  <PostInfo postDetails={post} reloadFun={getSinglePost} />
                    <hr />
                {post?.description}
              </Card.Body>
            </Card>
        </Col>
        <Col lg={5} className='commentsCol'>
            <Comment postDetails={post} getSinglePost={getSinglePost} />
        </Col>
      </Row>
  </Container>
  </>
  )};

export default SinglePost;