
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


export const fetchAllPosts = async ()=>{
    try{
        const res  = await fetch("/api/fetchAllPosts", {
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