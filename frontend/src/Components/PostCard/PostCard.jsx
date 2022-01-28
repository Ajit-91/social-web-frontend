import React from 'react';
import { Card, CardImg } from 'react-bootstrap';
import Avatar from '@mui/material/Avatar';
import { IconButton } from '@mui/material';
import {MdFavoriteBorder} from "react-icons/md"
import {MdFavorite} from "react-icons/md"
import {MdComment} from "react-icons/md"
import {MdShare} from "react-icons/md"
import { useNavigate } from 'react-router';
import "./postCard.css"
import { useState } from 'react';

const PostCard = ({width, postDetails}) => {
    const [like, setLike] = useState(false)
    const navigate = useNavigate()
  return (
  <>
    <Card className="shadow-lg postCard" style={{width : `${width}px`}}>
        <Card.Header className="header">
            <IconButton color='inherit' className='iconButton'>
                <Avatar src={postDetails?.creator?.profileImg} onClick={()=>navigate(`/profile/${postDetails?.creator?._id}`)} />
            </IconButton>
            <div className='headerInfo'>
                <h6>{postDetails?.creator?.name}</h6>
                <small>{postDetails?.date}</small>
            </div>
        </Card.Header>
        <CardImg src={postDetails?.postImg}/>
        <Card.Body>
    <Card.Title>Post Title</Card.Title>
        <div className='postInfo'>
                <div onClick={()=>setLike((prev)=>!prev)} >
                    {like ? 
                    <IconButton color='inherit' className='iconButton'>
                        <MdFavorite size="30px" color='red'/> 
                    </IconButton>
                    : 
                    <IconButton color='inherit' className='iconButton'>
                        <MdFavoriteBorder size="30px" />
                    </IconButton>
                    }
                    <span>&nbsp;{postDetails?.likes?.likeCount}</span>
                </div>

                <div className='mx-4'>
                    <IconButton color='inherit'>
                    <MdComment size="30px"/>
                    </IconButton>
                    <span>&nbsp;{postDetails?.comments?.length}</span>
                </div>
                <div className='share'>
                    <IconButton color='inherit' className='iconButton'>
                    <MdShare size="30px" />
                    </IconButton>
                </div>
                
        </div>
  </Card.Body>
    </Card>
  </>
  )};

export default PostCard;


