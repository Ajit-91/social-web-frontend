import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import PostCard from '../../Components/PostCard/PostCard';
const MyPosts = () => {
  return (
  <div className='main'>
      <Container className='mb-5'>

      <Row>
          <Col className='d-flex justify-content-center'>
      <PostCard width={450}/>
          </Col>
          <Col className='d-flex justify-content-center'>
      <PostCard width={450}/>
          </Col>
      </Row>
      <Row>
          <Col className='d-flex justify-content-center'>
      <PostCard width={450}/>
          </Col>
          <Col className='d-flex justify-content-center'>
      <PostCard width={450}/>
          </Col>
      </Row>
      </Container>
  </div>
  )};

export default MyPosts;
