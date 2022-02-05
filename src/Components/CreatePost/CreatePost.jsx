import React, {useRef, useState } from 'react';
import { Card, Row, Form, Modal, Button } from 'react-bootstrap';
import { SET_USER } from "../../Redux/Slices/userSlice"
import { useDispatch } from 'react-redux';
import FileUpload from '../FileUpload/FileUpload';
import {BsCloudUpload} from "react-icons/bs"
import {IoMdSend} from "react-icons/io"
import { createPost } from '../../API/Posts';
import Alerts from '../Alerts';
import { Spinner } from 'react-bootstrap';
import "./createPost.css"

const CreatePost = ({createPostStatus, setCreatePostStatus}) => {
    const fileUploadRef = useRef(null)
    const dispatch = useDispatch()
    const [previewImage, setPreviewImage] = useState("")
    const [imgDetails, setImgDetails] = useState(null)
    const [postDetails, setPostDetails] = useState()
    const [isDragging, setIsDragging] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [msg, setMsg] = useState("")
    const [alertType, setAlertType] = useState("")
    const [disabled, setDisabled] = useState(false)

    const handleHide = ()=>{
        setPreviewImage("")
        setPostDetails("")
        setImgDetails("")
        setIsDragging(false)
        setCreatePostStatus(false)
    }

    const handleDrop = e =>{
        e.stopPropagation()
        e.preventDefault()
        console.log(e)
        console.log(e.dataTransfer.files[0])
        const file = e.dataTransfer.files[0]
        if(!file) return
  
        setImgDetails(file)
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file)
        fileReader.onload = ()=>{
            setPreviewImage(fileReader.result)
        }
        fileReader.onerror = (err)=>{
          console.log(err)
        }
      }

    const handleSubmit = async (e)=>{
        e.preventDefault()
        setDisabled(true)
        if(!postDetails){
            setMsg("One or more fields are required")
            setAlertType("warning")
            setShowAlert(true)
            setDisabled(false)
            return
        }

        const formData = new FormData()
        formData.append("description", postDetails)
        if(imgDetails) formData.append("postImg", imgDetails)

        const response = await createPost(formData, JSON.parse(localStorage.getItem("user")))
        if(response?.msg === "success"){
            console.log(response)
            dispatch(SET_USER(response.resp))
            setMsg("Added a post")
            setAlertType("success")
            setShowAlert(true)
            setDisabled(false)
            handleHide()
        }else{
            setMsg("Something Went wrong")
            setAlertType("error")
            setShowAlert(true)
            setDisabled(false)
        }
    }


    return (
        <>
         <Alerts open={showAlert}  setOpen={setShowAlert} type={alertType} msg={msg} />
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
                                    <div className='uploadImg' 
                                        onDragEnter={(e)=>{
                                            e.preventDefault();
                                            e.stopPropagation();
                                            setIsDragging(true)
                                        }}
                                        onDragLeave={(e)=>{
                                            e.preventDefault();
                                            e.stopPropagation();
                                            setIsDragging(false)
                                        }}
                                        onDragOver={(e)=>{
                                            e.preventDefault();
                                            e.stopPropagation();
                                            return false;
                                        }}
                                        onDrop={handleDrop} 
                                        >
                                            {
                                                isDragging ? 
                                                <h4 className='text-muted'>Release to Upload File</h4>
                                                : (
                                                    <>
                                                        <BsCloudUpload size={90} color='#0d6efd' />
                                                        <p>Drag & Drop to Upload Image</p>
                                                        <p >OR</p>
                                                        <Button  onClick={()=>fileUploadRef.current.click()}>Browse File</Button>
                                                    </>
                                                )
                                            }
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
                                <Button 
                                    type="submit" 
                                    variant='outline-primary' 
                                    className='d-flex align-items-center postbtn' 
                                    disabled={disabled}
                                >   
                                    {
                                        disabled ? 
                                        <>
                                            <Spinner
                                            as="span"
                                            animation="grow"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                            />
                                                &nbsp;Creating...
                                        </>
                                        : (
                                            <>
                                                Post &nbsp;<IoMdSend size={20} /> 
                                            </>
                                        )
                                    }
                                    </Button>

                            </Form>
                        </Card.Body>
                    </Card>
                </Modal.Body>
            </Modal>

        </>
    )
};

export default CreatePost;
