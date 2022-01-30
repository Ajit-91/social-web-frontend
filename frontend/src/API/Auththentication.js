

const register = async (user)=>{
    console.log(user);
    try{
        console.log("user : "+user);
        const res = await fetch("/register", {
            method : "POST",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify(user)
        })
        const data = await res.json();
        
        if(res.status===200){
            return data;
        }
        else{
            alert(data);
        }
    }catch(err){
        console.log(err);
    }
}



const login = async (user)=>{
    console.log(user);
    try{
        console.log("user : "+user);
        const res = await fetch("/login", {
            method : "POST",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify(user)
        })
        const data = await res.json();
         console.log("data",data);
        console.log("res",res);
        if(res.status === 201){
            return data;
        }else{
            alert(data);
        }
    }catch(err){
        console.log(err);
    }
}


const fetchUser = async (userId)=>{
    try{
        const res = await fetch(`/api/fetchUser/${userId}`, {
            method : "GET",
        })
    
        const result = await res.json();
        if (res.status===200) {
            return result;
        } else {
            console.log(result);
        }
    }catch(err){
        console.log(err)
    }
   
}

const updateProfileApi = async (update, userid)=>{
    try{
        const res  = await fetch(`/api/updateprofile/${userid}`,{
            method : "PUT",
            body : update
        })
        const result = await res.json();
        console.log("updateRes",result);
        if (res.status===200) {
            alert("Saved")
            return result
        } else {
            console.log(result);
            alert("process failed")
        }

    }catch(err){
        console.log(err)
        alert("process failed")

    }
}

const followOrUnfollowApi = async (followerId, followingToId) =>{
    try{
        const res  = await fetch(`/api/followOrUnfollow/follower/${followerId}/followingTo/${followingToId}`,{
            method : "PUT"
        })
        const result = await res.json();
        console.log("follow",result);
        if (res.status===200) {
            return result
        } else {
            console.log(result);
            alert("process failed")
            return result
        }

    }catch(err){
        console.log(err)
        alert("process failed")

    }
}

export {register, login, fetchUser, updateProfileApi, followOrUnfollowApi};