import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";
import { addComment, deleteComment, getVideoComments, updateComment } from "../controllers/comment.controllers";

const router = Router()

router.use(verifyJWT)


router.route("/:videoId").post(addComment).get(getVideoComments);
router.route("/c/:commentId").delete(deleteComment).patch(updateComment);

export default router;