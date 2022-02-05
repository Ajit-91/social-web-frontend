import { Avatar } from '@mui/material';
import React, { useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { useSelector } from "react-redux"
import { selectUser } from '../../Redux/Slices/userSlice';
import { comment } from '../../API/Posts';
import { formatDate } from '../../Utilities/formatDate';
import {MdSend} from "react-icons/md"
import { IconButton } from '@mui/material';
import { Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import Alerts from '../Alerts';
import "./comment.css"

const Comment = ({postDetails, getSinglePost}) => {
    const user = useSelector(selectUser)
    const [commentBody, setCommentBody] = useState("")
    const [showAlert, setShowAlert] = useState(false)
    const [msg, setMsg] = useState("")
    const [alertType, setAlertType] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const postComment = async ()=>{
        setLoading(true)
        if(!commentBody){
            setMsg("Comment is required")
            setAlertType("warning")
            setShowAlert(true)
            setLoading(false)
            return
        }

        let body = {
            comment : commentBody
        }
        const resp = await comment(body, postDetails._id, user._id)
        if (resp === "scuccess"){
            setCommentBody("")
            getSinglePost()
            setMsg("Comment Added")
            setAlertType("success")
            setShowAlert(true)
            setLoading(false)
        }
        else{
            setMsg("Something went wrong")
            setAlertType("warning")
            setShowAlert(true)
            setLoading(false)
        }
    }

  return (
    <>
         <Alerts open={showAlert}  setOpen={setShowAlert} type={alertType} msg={msg} />
        <Card className='' >
            <Card.Header className='bg-white commentArea shadow'>
                <Avatar src={user?.profileImg} />
                <input 
                    type="text" 
                    value={commentBody}
                    onChange={(e)=>setCommentBody(e.target.value)}
                    className='commentInput' 
                    placeholder='Add a Comment'
                    onKeyDown={(e)=>{
                        if(e.key === "Enter") postComment()
                    }}
                />
                <IconButton  onClick={postComment}>
                    {
                        loading ?
                        <>
                                <Spinner
                                    as="span"
                                    animation="border"
                                    style={{borderWidth : '2px'}}
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                 />
                        </>
                        : (
                            <MdSend />
                        )
                    }
                </IconButton>
            </Card.Header>
            <Card.Body className='py-0 ' style={{minHeight : "430px"}}>
                {
                    postDetails?.comments?.length === 0 ?
                    <>
                        <div className='noComments'>
                            <h2>No Comments Yet</h2>
                        </div>
                    </>
                    :
                    postDetails?.comments?.map((val, i) =>(
                        <div key={i} className='allComments'>
                        <Row  >
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
                                <p style={{marginBottom : '7px'}} >{val?.comment}</p>
                            </div>
                            </Col>
                        </Row>
                        <hr style={{marginTop : 0}}  />
                         
                        </div>
                    ))
                }
            </Card.Body>
        </Card>
    </>
)};

export default Comment;
