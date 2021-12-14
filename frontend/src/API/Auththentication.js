
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

        if(res.status == 200){
            alert(data);
        }else{
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

        if(res.status == 200){
            return true;
        }else{
            alert(data);
        }
    }catch(err){
        console.log(err);
    }
}

export {register, login};