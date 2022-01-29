import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import { MdFavoriteBorder } from "react-icons/md"
import { MdFavorite } from "react-icons/md"
import { MdComment } from "react-icons/md"
import { MdShare } from "react-icons/md"
import { likeAPost } from '../../API/Posts';
import { RELOAD } from "../../Redux/Slices/loadingSlice"
import { useDispatch } from 'react-redux';
import "./postCard.css"
import { useEffect } from 'react';

const PostInfo = ({postDetails, ...fetchPost}) => {
    const dispatch = useDispatch()
    let likeStatus = postDetails?.likes?.likedBy.includes(JSON.parse(localStorage.getItem("user")))
    console.log("likestatus",likeStatus)
    const [isliked, setIsLiked] = useState(false)
    // console.log("isLikedStatus",postDetails?.likes?.likedBy.includes(JSON.parse(localStorage.getItem("user"))))
    console.log("stateLike",isliked)
    useEffect(()=>{
        setIsLiked(postDetails?.likes?.likedBy.includes(JSON.parse(localStorage.getItem("user"))))
        console.log("ueseEffect call")
    })

    const likeHandler = async ()=>{
        const resp = await likeAPost(postDetails?._id, JSON.parse(localStorage.getItem("user")))
        console.log(resp)
        dispatch(RELOAD())
        console.log("fetchPost",fetchPost)
        if(fetchPost?.getSinglePost) fetchPost?.getSinglePost()
        if(fetchPost?.getAllUserPost) fetchPost?.getAllUserPost()
        setIsLiked((prev) => !prev)
    }

    return (
        <>
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
                    {/* <IconButton color='inherit'> */}
                        <MdComment size="30px" />
                    {/* </IconButton> */}
                    <span>&nbsp;{postDetails?.comments?.length}</span>
                </div>
                <div className='share'>
                    <IconButton color='inherit' className='iconButton'>
                        <MdShare size="30px" />
                    </IconButton>
                </div>

            </div>
        </>
    )
};

export default PostInfo;
