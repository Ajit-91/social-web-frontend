import React, {useRef, useState} from 'react';
import { Card, Row, Form, Modal, Button } from 'react-bootstrap';
import FileUpload from '../FileUpload/FileUpload';
import {BsCloudUpload} from "react-icons/bs"
import { createPost } from '../../API/Posts';
import "./createPost.css"

const CreatePost = ({createPostStatus, setCreatePostStatus}) => {
    const fileUploadRef = useRef(null)
    const [previewImage, setPreviewImage] = useState("")
    const [imgDetails, setImgDetails] = useState(null)
    const [postDetails, setPostDetails] = useState()
    const handleSubmit = async (e)=>{
        e.preventDefault()
        
        const formData = new FormData()
        formData.append("description", postDetails)
        if(imgDetails) formData.append("postImg", imgDetails)

        const resp = await createPost(formData, JSON.parse(localStorage.getItem("user")))
        alert(resp)
        setCreatePostStatus(false)
    }
    // const handleChange = (e)=>{
    //     const { name, value } = e.target

    // }
    const handleHide = ()=>{
        setPreviewImage("")
        setPostDetails("")
        setCreatePostStatus(false)
    }
    return (
        <>
            <Modal
                size='lg'
                centered
                show={createPostStatus}
                onHide={handleHide}
            >
                <Modal.Header closeButton>
                    Create Post
                </Modal.Header>
                <Modal.Body>
                    <Card className=" py-3 rightCard mb-5">
                        <Card.Body >
                            <Form onSubmit={handleSubmit} >
                                {   previewImage ?  (  
                                     <div className='previewImg ' >
                                         <Card.Img  src={previewImage} />
                                    </div>
                                    ) : 
                                    <div className='uploadImg' onClick={()=>fileUploadRef.current.click()}>
                                        <BsCloudUpload size={60} />
                                        <p>Upload Image</p>
                                    </div>
                                }
                                <FileUpload ref={fileUploadRef} setPreviewImage={setPreviewImage} setImgDetails={setImgDetails} />
                                <Row>
                                    <Form.Group className="my-3" controlId="exampleForm.ControlTextarea1">
                                        <Form.Control 
                                            as="textarea" 
                                            placeholder= "What's in your mind"
                                            rows={5} 
                                            className='aboutSection' 
                                            name='post' 
                                            value={postDetails} 
                                            onChange={(e)=>setPostDetails(e.target.value)} />
                                    </Form.Group>
                                </Row>
                                <Button type="submit" variant='success' >Post</Button>

                            </Form>
                        </Card.Body>
                    </Card>
                </Modal.Body>
            </Modal>

        </>
    )
};

export default CreatePost;
