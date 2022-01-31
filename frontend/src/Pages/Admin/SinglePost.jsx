import React, { useState, useCallback, useEffect } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router';
import { fetchSinglePost } from '../../API/Posts';
import PostInfo from '../../Components/PostCard/PostInfo';
import Comment from '../../Components/Comment/Comment';
import { formatDate } from '../../Utilities/formatDate';
import { IconButton } from '@mui/material';
import { Avatar } from '@mui/material';
import Loading from '../../Components/Loading';

const SinglePost = () => {
  const params = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState([])
  const [loading, setLoading] = useState(true)

  const getSinglePost = useCallback(async () =>{
    const resp = await fetchSinglePost(params.postId)
    console.log("singlePost",resp)
    setPost(resp)
    setLoading(false)
  }, [params.postId])
  console.log("postS",post)

  useEffect(()=>{
    getSinglePost()
  }, [getSinglePost])

  return loading ? <Loading /> : (
  <>
  <Container className='mb-5'>
      <Row className='gx-4 gy-5'>
        <Col lg={7}>
            <Card>
            <Card.Header className="header bg-light">
                    <IconButton color='inherit' className='iconButton' onClick={() => navigate(`/profile/${post?.creator?._id}`)} >
                        <Avatar 
                            src={post?.creator?.profileImg}  
                        />
                    </IconButton>
                    <div className='headerInfo'>
                        <h6>{post?.creator?.name}</h6>
                        <small>{formatDate(post?.date)}</small>
                    </div>
                </Card.Header>
              <Card.Img src={post?.postImg} className='postImg' />
              <Card.Body>
                {post?.description}
                    <hr />
                  <PostInfo postDetails={post} reloadFun={getSinglePost} />
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
