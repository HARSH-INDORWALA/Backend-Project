import multer from 'multer';
import {ApiError} from '../utils/ApiError.js';
const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
const storage =multer.diskStorage({
    destination :(req,file,cb)=>{
        cb(null,"./public/temp");
    },

    filename :(req,file,cb)=>{
        cb(null,file.originalname);
    }
})

const fileFilter = (req, file, cb) => {
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new ApiError(400, "Only image files are allowed"));
    }
};

export const upload =multer({
    storage :storage,
    fileFilter :fileFilter
});