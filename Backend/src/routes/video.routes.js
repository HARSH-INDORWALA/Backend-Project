import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { deleteVideo, getAllVideos, getSuggestedVideos, getVideoById, togglePublishStatus, updateVideo, uploadAVideo } from "../controllers/video.controllers.js";
import { incrementView } from "../controllers/view.controllers.js";
const router = Router();
//Applying veirfyJWT authmiddleware to every route
router.use(verifyJWT)

router
    .route("/")
    .get(getAllVideos)
    .post(
        upload.fields([
            {
                name : "videoFile",
                maxCount :1
            },
            {
                name : "thumbnail",
                maxCount :1
            }
        ]),uploadAVideo
    );

router
    .route("/:videoId")
    .get(getVideoById)
    .patch(upload.single("thumbnail"),updateVideo)
    .delete(deleteVideo);   

router.route("/:videoId/view").post(verifyJWT, incrementView);
router.route("/suggestions/:videoId").get(verifyJWT, getSuggestedVideos);
router.route("/toggle/publish/:videoId").patch(togglePublishStatus);
export default router;