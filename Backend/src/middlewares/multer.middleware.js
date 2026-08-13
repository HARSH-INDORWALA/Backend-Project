import multer from 'multer';
import { ApiError } from '../utils/ApiError.js';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/temp");
    },

    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

const imageTypes = [
    "image/jpeg",
    "image/png",
    "image/jpg"
];

const videoTypes = [
    "video/mp4",
    "video/mpeg",
    "video/quicktime"
];

const fileFilter = (req, file, cb) => {

    if (file.fieldname === "videoFile") {
        return videoTypes.includes(file.mimetype)
            ? cb(null, true)
            : cb(new ApiError(400, "Video file must be a video"));
    }

    return imageTypes.includes(file.mimetype)
        ? cb(null, true)
        : cb(new ApiError(400, "Only image files are allowed"));
};

export const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});