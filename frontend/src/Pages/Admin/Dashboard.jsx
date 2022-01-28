import React, { useState, useEffect } from 'react'
import PostCard from '../../Components/PostCard/PostCard';
import { fetchAllPosts } from '../../API/Posts';
import FileUpload from '../../Components/FileUpload/FileUpload';
import "../../pageStyles/dashboard.css"
const Dashboard = () => {
    // const [previewImage, setPreviewImage] = useState('')
    const [posts, setPosts] = useState([])
    useEffect(()=>{
        const getAllUserPost = async ()=>{
            const Posts = await fetchAllPosts()
            setPosts(Posts)
            console.log("posts",posts)
        }
 
        getAllUserPost()
    }, [])
    return (
        <div className='main'>
                    {
                        posts?.map((value, i)=>(
                        <>
                            <PostCard  postDetails={value} key={i} />
                            <br/>
                        </>
                        ))
                    }
        </div>
    )
}

export default Dashboard;
