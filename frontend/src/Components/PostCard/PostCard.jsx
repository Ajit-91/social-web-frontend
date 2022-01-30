import React from 'react';
import { Card, CardImg } from 'react-bootstrap';
import Avatar from '@mui/material/Avatar';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router';
import { formatDate } from '../../Utilities/formatDate';
import PostInfo from './PostInfo';
import "./postCard.css"

const PostCard = ({ postDetails, getAllUserPost }) => {
    const navigate = useNavigate()
    return (
        <>
            <Card className="shadow-lg postCard" >
                <Card.Header className="header bg-light">
                    <IconButton color='inherit' className='iconButton'>
                        <Avatar 
                            src={postDetails?.creator?.profileImg}  
                            onClick={() => navigate(`/profile/${postDetails?.creator?._id}`)} 
                        />
                    </IconButton>
                    <div className='headerInfo'>
                        <h6>{postDetails?.creator?.name}</h6>
                        <small>{formatDate(postDetails?.date)}</small>
                    </div>
                </Card.Header>
                {
                    postDetails?.postImg && (
                            <CardImg 
                                src={postDetails?.postImg} className='postImg' 
                                onClick={()=>navigate(`/singlePost/${postDetails?._id}`)}
                                style={{cursor : "pointer"}}
                            />
                    )
                }
                <Card.Body 
                    onClick={()=>navigate(`/singlePost/${postDetails?._id}`)}
                    style={{cursor : "pointer"}}
                >
                    <p 
                        className='postDescrption'
                        style={{whiteSpace : `${postDetails?.postImg ? "nowrap" : "normal"}`}}
                    >
                        {postDetails?.description}
                    </p>
                </Card.Body>

                <Card.Footer className='bg-white '>
                    <PostInfo postDetails={postDetails} reloadFun={getAllUserPost} />
                </Card.Footer>

            </Card>
        </>
    )
};

export default PostCard;


