import React, { useState } from 'react'
import PostCard from '../../Components/PostCard/PostCard';
import FileUpload from '../../Components/FileUpload/FileUpload';
import "../../pageStyles/dashboard.css"
const Dashboard = () => {
    const [previewImage, setPreviewImage] = useState('')
    return (
        <div className='main'>
            <PostCard />
            <br/>
            <PostCard />
            <br/>
            <PostCard />
            <br/>
            <PostCard />
            <br/>
            <FileUpload setPreviewImage={setPreviewImage} />
            {
                previewImage && (
                    <img src={previewImage} alt='pic' width={300}/>
                )
            }
        </div>
    )
}

export default Dashboard;
