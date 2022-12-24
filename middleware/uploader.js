const multer = require('multer');
const path = require("path");

const storage = multer.diskStorage({
    destination: "images",
    // formating filename 
    filename: (req, file, cb) => {
        const uniqeSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqeSuffix + '-' + file.originalname);
    }
});

const uploader = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const supportedImage = /png|jpg|jpeg/;
        const extension = path.extname(file.originalname);

        // checking the file extension is matching with supportedImage or not 
        if (supportedImage.test(extension)) {
            cb(null, true);
        } else {
            cb(new Error("File must be png/jpg/jpeg formate"));
        }
    },
    limits: {
        fileSize: 5000000 // 5mb limit 
    }
});

module.exports = uploader;