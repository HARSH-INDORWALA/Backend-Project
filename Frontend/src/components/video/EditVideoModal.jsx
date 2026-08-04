import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Switch } from "@mui/material";

import {
    Button,
    Input,
    LoadingSpinner,
    Modal,
    ImageUpload,
} from "../common";

import {
    useUpdateVideo,
    useTogglePublishStatus,
} from "../../hooks/video";

function EditVideoModal({
    open,
    onClose,
    video,
}) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const [thumbnail, setThumbnail] = useState(null);
    const [isPublished, setIsPublished] = useState(false);

    const {
        mutate: updateVideo,
        isPending,
    } = useUpdateVideo();

    const {
        mutate: togglePublish,
        isPending: isToggling,
    } = useTogglePublishStatus();

    useEffect(() => {
        if (video) {
            reset({
                title: video.title ?? "",
                description: video.description ?? "",
            });

            setIsPublished(Boolean(video.isPublished));
            setThumbnail(video.thumbnail ?? null);
        }
    }, [video, reset]);

    const onSubmit = (data) => {
        const formData = new FormData();

        if (data.title !== video.title) {
            formData.append("title", data.title);
        }

        if (data.description !== video.description) {
            formData.append("description", data.description);
        }

        if (thumbnail instanceof File) {
            formData.append("thumbnail", thumbnail);
        }

        if ([...formData.entries()].length === 0) {
            onClose();
            return;
        }

        updateVideo(
            {
                videoId: video._id,
                formData,
            },
            {
                onSuccess: () => {
                    onClose();
                },
            }
        );
    };

    return (
        <Modal
            isOpen={open}
            onClose={onClose}
            title="Edit Video"
            maxWidth="max-w-2xl"
        >
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-2"
            >
                <ImageUpload
                    id="thumbnail"
                    label="Thumbnail"
                    variant="thumbnail"
                    preview={thumbnail}
                    onChange={setThumbnail}
                />

                <Input
                    label="Title"
                    placeholder="Enter video title"
                    error={errors.title?.message}
                    {...register("title", {
                        required: "Title is required",
                    })}
                />

                <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">
                        Description
                    </label>

                    <textarea
                        rows={4}
                        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
                        placeholder="Write a description..."
                        {...register("description")}
                    />
                </div>

                <div className="flex items-center justify-between rounded-xl border border-border bg-background px-4 py-3">
                    <div>
                        <p className="text-sm font-medium text-foreground">
                            Publish Status
                        </p>

                        <p className="text-xs text-foreground">
                            {isPublished
                                ? "Your video is public."
                                : "Your video is private."}
                        </p>
                    </div>

                    <Switch
                        checked={Boolean(isPublished)}
                        disabled={isToggling}
                        onChange={() => {
                            togglePublish(video._id, {
                                onSuccess: (data) => {
                                    setIsPublished(
                                        Boolean(
                                            data.updatedVideo.isPublished
                                        )
                                    );
                                },
                            });
                        }}
                    />
                </div>

                <div className="flex justify-end gap-3  ">
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>

                    <Button
                        type="submit"
                        disabled={isPending}
                    >
                        {isPending ? (
                            <LoadingSpinner size={20} />
                        ) : (
                            "Save Changes"
                        )}
                    </Button>
                </div>
            </form>
        </Modal>
    );
}

export default EditVideoModal;