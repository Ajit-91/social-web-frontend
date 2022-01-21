

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
        const res = await fetch("/api/fetchUser", {
            method : "POST",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify({id : userId})
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

export {register, login, fetchUser};