import React from 'react';
import { Card, CardImg } from 'react-bootstrap';
import Avatar from '@mui/material/Avatar';
import { IconButton } from '@mui/material';
import {MdFavoriteBorder} from "react-icons/md"
import {MdFavorite} from "react-icons/md"
import {MdComment} from "react-icons/md"
import {MdShare} from "react-icons/md"
import "./postCard.css"
import { useState } from 'react';

const PostCard = ({width}) => {
    const [like, setLike] = useState(false)

  return (
  <>
    <Card className="shadow-lg postCard" style={{width : `${width}px`}}>
        <Card.Header className="header">
            <IconButton color='inherit' className='iconButton'>
                <Avatar />
            </IconButton>
            <div className='headerInfo'>
                <h6>UserName</h6>
                <small>12th Nov 2020</small>
            </div>
        </Card.Header>
        <CardImg src='https://th.bing.com/th/id/OIP.i6f_jFoXc-8pQJmo5_JZXAHaD6?w=310&h=180&c=7&r=0&o=5&pid=1.7'/>
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
                    <span>&nbsp;15</span>
                </div>

                <div className='mx-4'>
                    <IconButton color='inherit'>
                    <MdComment size="30px"/>
                    </IconButton>
                    <span>&nbsp;15</span>
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


