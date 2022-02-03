import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { IconButton } from '@mui/material';
import {FiEdit} from "react-icons/fi"
import "../../pageStyles/profile.css"

const RightProfileCard = ({userDetails, setUpdateProfile}) => {
  return (
    <div>
          <Card className="shadow-lg py-3 rightCard mb-5">
              <Card.Header className='bg-white'>
                  <div className='d-flex justify-content-between align-items-center'>
                      PROFILE DETAILS
                      {
                          userDetails?._id === JSON.parse(localStorage.getItem("user")) && (
                            <IconButton color='inherit' onClick={()=>setUpdateProfile(true)}>
                                    <FiEdit size={25} style={{cursor : "pointer"}} />
                            </IconButton>
                          )
                      }
                  </div>
              </Card.Header>
              <Card.Body >
                  <Row>
                    <h2>About Me</h2>
                    <p>{userDetails?.bio}</p>
                  </Row>
                  <Row className="mb-4 mt-4">
                      <Col lg={3}>
                            <h5>Name</h5>
                      </Col>
                      <Col lg={9}>
                          <div className='bg-light p-2'>
                                {userDetails?.name}
                          </div>
                      </Col>
                  </Row>
                  <Row className="mb-4">
                      <Col lg={3}>
                            <h5>Email</h5>
                      </Col>
                      <Col lg={9}>
                          <div className='bg-light p-2'>
                                {userDetails?.email}
                          </div>
                      </Col>
                  </Row>
                  <Row className="mb-4">
                      <Col lg={3}>
                            <h5>Course</h5>
                      </Col>
                      <Col lg={9}>
                          <div className='bg-light p-2'>
                                {userDetails?.course}
                          </div>
                      </Col>
                  </Row>
                  <Row className="mb-4">
                      <Col lg={3}>
                            <h5>College</h5>
                      </Col>
                      <Col lg={9}>
                          <div className='bg-light p-2'>
                                {userDetails?.college}
                          </div>
                      </Col>
                  </Row>
              </Card.Body>
          </Card>
    </div>
  )};

export default RightProfileCard;
