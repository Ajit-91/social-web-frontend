
export const formatDate = (givenFormat)=>{
    let options = {
        day : "numeric",
        month : "short",
        year : "numeric"
    }
    let date = new Date(givenFormat);
    date = date.toLocaleDateString("en-GB", options)

    return date;
}
