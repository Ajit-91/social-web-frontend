import { Avatar } from '@mui/material';
import React from 'react';
import { Modal, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import "../../pageStyles/profile.css"

const FollowersOrFollowingList = ({showList, setShowList, list, listType}) => {
    const navigate = useNavigate()

    const handleHide = ()=>{
        setShowList(false)
    }

    console.log("list", list)
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
                <Row>
                    {
                        list?.map((value, i)=>(
                            <Col lg={12} key={i} >
                                <div 
                                    className='follwrContnr'
                                    style={{cursor : "pointer"}} 
                                    onClick={()=>{
                                        handleHide()
                                        navigate(`/profile/${value?._id}`)
                                    }} 
                                >
                                    <Avatar 
                                        src={value?.profileImg}   
                                    />
                                    <div className='follwrInfo'>
                                        <p>{value?.name}</p>
                                        <small>{value?.followers?.length} Followers</small>
                                    </div>
                                </div>
                                <hr style={{marginBottom : 0}} />
                            </Col>
                        ))
                    }
                </Row>
            </Modal.Body>
        </Modal>
    </div>
  )};

export default FollowersOrFollowingList;
