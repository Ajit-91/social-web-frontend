import React, { forwardRef } from 'react';
import "./fileUpload.css"

const FileUpload = ({setPreviewImage, setImgDetails}, ref) => {

    const handleImageChange = e =>{
        const file = e.target.files[0]
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

  return(
  <div>
      <input type="file" 
      hidden 
      accept='image/*' 
      ref={ref}
      onChange={handleImageChange} 
      />
  </div>
  )};

export default forwardRef(FileUpload);
