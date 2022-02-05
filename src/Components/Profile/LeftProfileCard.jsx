import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import Avatar from '@mui/material/Avatar';
import { followOrUnfollowApi } from '../../API/Auththentication';
import FollowersOrFollowingList from './FollowersOrFollowingList';
import { useNavigate } from 'react-router';
import { Spinner } from 'react-bootstrap';

const LeftProfileCard = ({ userDetails, setReload }) => {
    const [isFollowing, setIsFollowing] = useState()
    const [showList, setShowList] = useState(false)
    const [list, setList] = useState([])
    const [listType, setListType] = useState("")
    const navigate = useNavigate()
    const [disabled, setDisabled] = useState(false)


    useEffect(() => {
        // checking if logged In user exists in followers list of the user
        setIsFollowing(userDetails?.followers?.find((elmnt) => {
            if (elmnt._id === JSON.parse(localStorage.getItem("user"))) return true
            else return false

        }))

    }, [userDetails, isFollowing])

    const followHandler = async () => {
        setDisabled(true)
        const followerId = JSON.parse(localStorage.getItem("user"))
        const followingToId = userDetails?._id
        await followOrUnfollowApi(followerId, followingToId)
        setIsFollowing(prev => !prev)
        setReload(prev => !prev)
        setDisabled(false)
    }
    return (
        <>
            <FollowersOrFollowingList showList={showList} setShowList={setShowList} list={list} listType={listType} />
            <Card className="shadow-lg py-3 leftCard">
                <Card.Body>
                    <Row className='gy-3'>
                        <Col className='imgRow' >
                            <Avatar
                                src={userDetails?.profileImg}
                                variant='circular'
                                sx={{ width: 200, height: 200 }}
                                alt="profile image"
                            />
                            <h3 className='mt-4'>{userDetails?.name}</h3>
                        </Col>
                        <Col className='imgRow'>
                            {
                                userDetails?._id !== JSON.parse(localStorage.getItem("user")) && (
                                <>
                                    <Button 
                                        variant={isFollowing ? "secondary" : "primary"} 
                                        size="lg" 
                                        className='followBtn align-tems-center' 
                                        onClick={followHandler} 
                                        disabled={disabled}
                                        >
                                        {
                                            disabled &&(
                                                <>
                                                    <Spinner
                                                        as="span"
                                                        animation="border"
                                                        style={{borderWidth : '2px'}}
                                                        size="sm"
                                                        role="status"
                                                        aria-hidden="true"
                                                    />
                                                     &nbsp;
                                                </>
                                            )
                                        }
                                        {isFollowing ? 'Unfollow' : 'Follow'}
                                    </Button>
                                </>
                                )
                            }
                            <div className='userDetails'>
                                <div className='atomicDetail'>
                                    <h2>{userDetails?.postCount}</h2>
                                    <small
                                        onClick={() => navigate(`/myPosts/${userDetails?._id}`)}
                                    >Posts
                                    </small>
                                </div>
                                <div className='atomicDetail' >
                                    <h2>{userDetails?.followers?.length}</h2>
                                    <small
                                        onClick={() => {
                                            setList(userDetails?.followers)
                                            setListType("Followers")
                                            setShowList(true)
                                        }}
                                    >Followers
                                    </small>
                                </div>
                                <div className='atomicDetail' >
                                    <h2>{userDetails?.following?.length}</h2>
                                    <small
                                        onClick={() => {
                                            setList(userDetails?.following)
                                            setListType("Following")
                                            setShowList(true)
                                        }}
                                    >Following</small>
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
