
export const createPost = async (body, userId)=>{
    try{
        const res  = await fetch(`${process.env.REACT_APP_BASE_URL}/api/createpost/${userId}`,{
            method : "POST",
            body : body
        })

        const result = await res.json();
        if (res.status===200) {
            return result
        } else {
            console.log(result);
            return result
        }

    }catch(err){
        console.log(err)
    }
}
export const comment = async (body, postId, commentorId)=>{
    try{
        const res  = await fetch(`${process.env.REACT_APP_BASE_URL}/api/post/${postId}/comment/${commentorId}`,{
            method : "POST",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify(body)
        })

        const result = await res.json();

        if (res.status===200) {
            return result
        } else {
            console.log(result);
            return result
        }

    }catch(err){
        console.log(err)
    }
}
export const likeAPost = async (postId, likerId)=>{
    try{
        const res  = await fetch(`${process.env.REACT_APP_BASE_URL}/api/post/${postId}/like/${likerId}`,{
            method : "PUT",
        })

        const result = await res.json();
        
        if (res.status===200) {
            return result
        } else {
            console.log(result);
            return result
        }

    }catch(err){
        console.log(err)
    }
}


export const fetchUserAllPosts = async (userId)=>{
    try{
        const res  = await fetch(`${process.env.REACT_APP_BASE_URL}/api/fetchUserPosts/${userId}`, {
            method : "GET"
        })
        const result = await res.json();

        if (res.status===200) {
            return result
        } else {
            console.log(result);
            return result
        }

    }catch(err){
        console.log(err)
    }
}


export const fetchAllPosts = async (userId)=>{
    try{
        const res  = await fetch(`${process.env.REACT_APP_BASE_URL}/api/fetchAllPosts`, {
            method : "POST",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify({userId})
        })
        const result = await res.json();

        if (res.status===200) {
            return result
        } else {
            console.log(result);
            return result
        }

    }catch(err){
        console.log(err)
    }
}

export const fetchSinglePost = async (postId)=>{
    try{
        const res  = await fetch(`${process.env.REACT_APP_BASE_URL}/api/fetchSinglePost/${postId}`, {
            method : "GET"
        })
        const result = await res.json();

        if (res.status===200) {
            return result
        } else {
            console.log(result);
            return result
        }

    }catch(err){
        console.log(err)
    }
}