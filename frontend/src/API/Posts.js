
export const createPost = async (body, userId)=>{
    try{
        const res  = await fetch(`/api/createpost/${userId}`,{
            method : "POST",
            body : body
        })

        const result = await res.json();
        console.log("postRes",result);
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
        const res  = await fetch(`/api/post/${postId}/comment/${commentorId}`,{
            method : "POST",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify(body)
        })

        const result = await res.json();
        console.log("comment",result);
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
        const res  = await fetch(`/api/post/${postId}/like/${likerId}`,{
            method : "PUT",
            // headers : {"Content-Type" : "application/json"},
            // body : JSON.stringify(body)
        })

        const result = await res.json();
        console.log("like",result);
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
        const res  = await fetch(`/api/fetchUserPosts/${userId}`, {
            method : "GET"
        })
        const result = await res.json();
        console.log("user posts",result);
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
        const res  = await fetch("/api/fetchAllPosts", {
            method : "POST",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify({userId})
        })
        const result = await res.json();
        console.log("user posts",result);
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
        const res  = await fetch(`/api/fetchSinglePost/${postId}`, {
            method : "GET"
        })
        const result = await res.json();
        console.log("single post",result);
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