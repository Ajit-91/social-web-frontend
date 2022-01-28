
export const createPost = async (body, userId)=>{
    try{
        const res  = await fetch(`/api/createpost/${userId}`,{
            method : "POST",
            body : body
        })

        const result = await res.json();
        console.log("postRes",result);
        if (res.status===200) {
            // alert("Success")
            return result
        } else {
            console.log(result);
            alert("process failed")
        }

    }catch(err){
        console.log(err)
    }
}