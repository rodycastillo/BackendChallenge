const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: path.join( __dirname, '../public/upload'),
    filename(req, file, cb){ 
         cb(null, new Date().getTime() + path.extname(file.originalname))
    }
});


module.exports = { storage };