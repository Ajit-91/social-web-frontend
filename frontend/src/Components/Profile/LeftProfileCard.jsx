import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import Avatar from '@mui/material/Avatar';
import { followOrUnfollowApi } from '../../API/Auththentication';
import FollowersOrFollowingList from './FollowersOrFollowingList';
import { useNavigate } from 'react-router';

const LeftProfileCard = ({userDetails, setReload}) => {
    const [isFollowing, setIsFollowing] = useState()
    const [showList, setShowList] = useState(false)
    const [list, setList] = useState([])
    const [listType, setListType] = useState("")
    const navigate = useNavigate()

    console.log("isFollowing",isFollowing)

    useEffect(()=>{
        // checking if logged In user exists in followers list of the user
        setIsFollowing(userDetails?.followers?.find((elmnt)=>{
            if(elmnt._id === JSON.parse(localStorage.getItem("user"))) return true
            else return false
            
        }))
    console.log("isFollowing useEff",isFollowing)

    }, [userDetails])

    const followHandler = async ()=>{
        const followerId = JSON.parse(localStorage.getItem("user"))
        const followingToId = userDetails?._id
        await followOrUnfollowApi(followerId, followingToId)
        setIsFollowing(prev=>!prev)
        setReload(prev=>!prev)
    }
    return (
        <>
            <FollowersOrFollowingList showList={showList} setShowList={setShowList} list={list} listType={listType}  />
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
                                        {
                                            isFollowing ? 
                                            <Button variant="secondary" size="lg" className='followBtn' onClick={followHandler}>
                                                Unfollow
                                            </Button> 
                                            : 
                                            <Button variant="primary" size="lg" className='followBtn' onClick={followHandler} >
                                                Follow
                                            </Button> 
                                        }
                                    </>
                                )
                            }
                            <div className='userDetails'>
                                <div className='atomicDetail'>
                                    <h2>{userDetails?.postCount}</h2>
                                    <small
                                        onClick={()=>navigate(`/myPosts/${userDetails?._id}`)}
                                    >Posts
                                    </small>
                                </div>
                                <div className='atomicDetail' >
                                    <h2>{userDetails?.followers?.length}</h2>
                                    <small
                                        onClick={()=>{
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
                                        onClick={()=>{
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
