import { Avatar } from '@mui/material';
import React from 'react';
import { Modal, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import "../../pageStyles/profile.css"

const FollowersOrFollowingList = ({ showList, setShowList, list, listType }) => {
    const navigate = useNavigate()

    const handleHide = () => {
        setShowList(false)
    }

    return (
        <div>
            <Modal
                centered
                size='sm'
                show={showList}
                onHide={handleHide}
            >
                <Modal.Header closeButton>
                    {listType}
                </Modal.Header>
                <Modal.Body className='pb-0'>

                    {
                        list?.map((value, i) => (
                            <div key={i} className='follwrsRow'>
                                <Row>
                                    <Col xs={2} style={{ paddingRight: 0 }}>
                                        <Avatar
                                            src={value?.profileImg}
                                            style={{ cursor: "pointer" }}
                                            onClick={() => {
                                                handleHide()
                                                navigate(`/profile/${value?._id}`)
                                            }}
                                        />
                                    </Col>
                                    <Col xs={10} style={{ paddingLeft: 0 }}>
                                        <div className='follwrInfo'>
                                            <p>{value?.name}</p>
                                            <small>{value?.followers?.length} Followers</small>
                                        </div>
                                    </Col>
                                </Row>
                                <hr />
                            </div>
                        ))
                    }
                </Modal.Body>
            </Modal>
        </div>
    )
};

export default FollowersOrFollowingList;
