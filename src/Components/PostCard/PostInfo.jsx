import React, { useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import { MdFavoriteBorder } from "react-icons/md"
import { MdFavorite } from "react-icons/md"
import { MdComment } from "react-icons/md"
import { MdShare } from "react-icons/md"
import { likeAPost } from '../../API/Posts';
import ShareLink from './ShareLink';
import "./postCard.css"

const PostInfo = ({postDetails, reloadFun}) => {

    const [isliked, setIsLiked] = useState()
    const [showShareLink, setShowShareLink] = useState(false)

    useEffect(()=>{
        setIsLiked(postDetails?.likes?.likedBy?.includes(JSON.parse(localStorage.getItem("user"))))
    }, [postDetails])

    const likeHandler= async ()=> {
       const resp =  await likeAPost(postDetails?._id, JSON.parse(localStorage.getItem("user")));
       console.log("like",resp)
        await reloadFun()
    }

    return (
        <>
            <ShareLink showShareLink={showShareLink} setShowShareLink={setShowShareLink} postDetails={postDetails} />
            <div className='postInfo'>
                <div onClick={likeHandler} >
                    {isliked ?
                        <IconButton color='inherit' className='iconButton'>
                            <MdFavorite size="30px" color='red' />
                        </IconButton>
                        :
                        <IconButton color='inherit' className='iconButton'>
                            <MdFavoriteBorder size="30px" />
                        </IconButton>
                    }
                    <span>&nbsp;{postDetails?.likes?.likeCount}</span>
                </div>

                <div className='mx-4'>
                        <MdComment size="30px" />
                    <span>&nbsp;{postDetails?.comments?.length}</span>
                </div>
                <div className='share'>
                    <IconButton color='inherit' className='iconButton' onClick={()=>setShowShareLink(true)} >
                        <MdShare size="30px" />
                    </IconButton>
                </div>

            </div>
        </>
    )
};

export default PostInfo;
