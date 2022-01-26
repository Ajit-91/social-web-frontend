import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import Avatar from '@mui/material/Avatar';

const LeftProfileCard = ({userDetails}) => {
    return (
        <>
            <Card className="shadow-lg py-3 leftCard">
                <Card.Body>
                    <Row className='gy-3'>
                        <Col className='imgRow' >
                            <Avatar
                                src={userDetails?.profileImg}
                                variant='circular'
                                style={{ cursor: "pointer" }}
                                // onClick={() => inputRef.current.click()}
                                sx={{ width: 200, height: 200 }}
                                alt="profile image"
                            />
                            <h3 className='mt-4'>{userDetails?.name}</h3>
                        </Col>
                        <Col className='imgRow'>
                            <Button variant="primary" size="lg" className='followBtn'>
                                Follow
                            </Button>
                            <div className='userDetails'>
                                <div className='atomicDetail'>
                                    <h2>{userDetails?.postCount}</h2>
                                    <small>Posts</small>
                                </div>
                                <div className='atomicDetail'>
                                    <h2>{userDetails?.followers?.length}</h2>
                                    <small>Followers</small>
                                </div>
                                <div className='atomicDetail'>
                                    <h2>{userDetails?.following?.length}</h2>
                                    <small>Following</small>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </>
    )
};

export default LeftProfileCard;
