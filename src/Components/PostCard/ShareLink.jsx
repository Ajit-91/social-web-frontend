import React from 'react';
import { Modal, InputGroup, FormControl } from 'react-bootstrap';
import { MdContentCopy } from "react-icons/md"
import { FcOk } from "react-icons/fc"
import { useState } from 'react';
import { useRef } from 'react';
import Alerts from '../Alerts';

const ShareLink = ({showShareLink, setShowShareLink, postDetails}) => {
  const [isCopied, setIsCopied] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [msg, setMsg] = useState("")
  const [alertType, setAlertType] = useState("")
  const linkRef = useRef()

  const handleHide = ()=>{
    setShowShareLink(false)
  }

  const handleCopy = ()=>{
    linkRef?.current?.select()
    linkRef?.current?.setSelectionRange(0, 99999); /* For mobile devices */
    /* Copy the text inside the text field */
    if(navigator?.clipboard === undefined){
      setMsg("Something went wrong")
      setAlertType("error")
      setShowAlert(true)
      return
    }
   navigator?.clipboard?.writeText(linkRef.current.value);
    setIsCopied(true)
    setMsg("Successfully Copied")
    setAlertType("success")
    setShowAlert(true)

    setTimeout(()=>{
      setIsCopied(false)
    }, 3000)
  }
  return (
      <div>
         <Alerts open={showAlert}  setOpen={setShowAlert} type={alertType} msg={msg} />
          <Modal
            centered
            size='md'
            show={showShareLink}
            onHide={handleHide}
          >
            <Modal.Header>Copy Link to share</Modal.Header>
              <Modal.Body>
                    <InputGroup>
                        <FormControl 
                          disabled
                          ref={linkRef}
                          value={`${process.env.REACT_APP_FRONTEND_URL}/singlePost/${postDetails?._id}`}
                        />
                       
                        <InputGroup.Text style={{cursor : "pointer"}} onClick={handleCopy}>
                          {
                            isCopied ?
                              <FcOk />
                              :
                              <MdContentCopy />
                          }
                        </InputGroup.Text>
                    </InputGroup>
              </Modal.Body>
          </Modal>
      </div>
  )
};

export default ShareLink;
