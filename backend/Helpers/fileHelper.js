const multer = require("multer")

const storage = multer.diskStorage({
    destination : (req, file, cb)=> {
      console.log(file)
      cb(null, `Uploads/${file.fieldname}s`)
    },
    filename : (req, file, cb)=> {
      const uniqueSuffix =  file.fieldname + '-' + Date.now() + '-' + file.originalname
      cb(null, uniqueSuffix)
    }
  })
  
const upload = multer({ storage: storage })

module.exports = {upload}