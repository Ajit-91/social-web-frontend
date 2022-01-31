import { Avatar } from '@mui/material';
import React, { useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { useSelector } from "react-redux"
import { selectUser } from '../../Redux/Slices/userSlice';
import { comment } from '../../API/Posts';
import { formatDate } from '../../Utilities/formatDate';
import {MdSend} from "react-icons/md"
import { IconButton } from '@mui/material';
import "./comment.css"
import { useNavigate } from 'react-router';

const Comment = ({postDetails, getSinglePost}) => {
    const user = useSelector(selectUser)
    const loadingState = useSelector((state)=>state.loading.isLoading)
    const [commentBody, setCommentBody] = useState("")
    const navigate = useNavigate()

    const postComment = async ()=>{
        console.log(commentBody)
        let body = {
            comment : commentBody
        }
        const resp = await comment(body, postDetails._id, user._id)
        if (resp === "scuccess"){
            console.log("prevState",loadingState)
            setCommentBody("")
            getSinglePost()
        }
        else{
            alert("process failed")
        }
    }

  return (
    <>
        <Card className='' >
            <Card.Header className='bg-white commentArea shadow'>
                <Avatar src={user?.profileImg} />
                <input 
                    type="text" 
                    value={commentBody}
                    onChange={(e)=>setCommentBody(e.target.value)}
                    className='commentInput' 
                    placeholder='Write a Public Comment'
                    onKeyDown={(e)=>{
                        if(e.key === "Enter") postComment()
                    }}
                />
                <IconButton  onClick={postComment}>
                    <MdSend />
                </IconButton>
            </Card.Header>
            <Card.Body className='py-0'>
                {
                    postDetails?.comments?.length === 0 ?
                    <>
                        <div className='noComments'>
                            <h2>No Comments Yet</h2>
                        </div>
                    </>
                    :
                    postDetails?.comments?.map((val, i) =>(
                        <>
                        <Row key={i} >
                        <hr style={{marginTop : 0}} />
                            <Col xs={2} style={{paddingRight : 0}} >
                            <Avatar 
                                src={val?.commentBy?.profileImg} 
                                onClick={()=>navigate(`/profile/${val?.commentBy?._id}`)}
                                style={{cursor : "pointer"}}
                            />
                            </Col>
                            <Col xs={10} style={{paddingLeft : 0}} >
                            <div className='commentInfo'>
                                <div>
                                    <small 
                                        className='text-muted'
                                        onClick={()=>navigate(`/profile/${val?.commentBy?._id}`)}
                                        style={{cursor : "pointer"}}
                                    >{val?.commentBy?.name}
                                    </small>
                                    <span><small className='text-muted'>{formatDate(val?.commentedAt)}</small></span>
                                </div>
                                <p>{val?.comment}</p>
                            </div>
                            </Col>
                        </Row>
                         
                        </>
                    ))
                }
            </Card.Body>
        </Card>
    </>
)};

export default Comment;
