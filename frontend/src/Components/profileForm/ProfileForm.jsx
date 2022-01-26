import React from 'react';
import { Card, Row, Col, Form } from 'react-bootstrap';
import "../../pageStyles/profile.css"
const ProfileForm = () => {
  return (
    <div>
          <Card className="shadow-lg py-3 rightCard mb-5">
              <Card.Header className='bg-white'>
                  Profile Details
              </Card.Header>
              <Card.Body >
                    <Form>
                        <Row>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Bio</Form.Label>
                            <Form.Control as="textarea" rows={3} disabled className='aboutSection' />
                        </Form.Group>

                        </Row>
                        <Row>
                            <Col lg={6}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" disabled />
                            </Form.Group>
                            </Col>

                            <Col lg={6}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" disabled />
                            </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col lg={12}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" disabled  />
                            </Form.Group>
                            </Col>

                            <Col lg={12}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Course</Form.Label>
                                <Form.Control type="text" disabled  />
                            </Form.Group>
                            </Col>

                            <Col lg={12}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>College</Form.Label>
                                <Form.Control type="text" disabled  />
                            </Form.Group>
                            </Col>
                        </Row>

                    </Form>
              </Card.Body>
          </Card>
    </div>
  )};

export default ProfileForm;
