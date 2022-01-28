import React, { forwardRef } from 'react';
import "./fileUpload.css"

const FileUpload = ({setPreviewImage, setImgDetails}, ref) => {

    const handleImageChange = e =>{
        const file = e.target.files[0]
        if(!file) return
        console.log("file ",file)
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

  return(
  <div>
      <input type="file" 
      hidden 
      // name='profileImg'
      accept='image/*' 
      ref={ref}
      onChange={handleImageChange} 
      />
  </div>
  )};

export default forwardRef(FileUpload);
