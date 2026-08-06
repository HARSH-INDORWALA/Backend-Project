import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import Card from "../components/common/Card";
import { UploadActions, UploadDropzone, ThumbnailSelector, VideoForm } from "../components/video";

import { useUploadVideo } from "../hooks/video/useUploadVideo";

function UploadVideoPage() {
    const navigate = useNavigate();

    const {
        mutate,
        isPending,
        isSuccess,
        isError,
        uploadProgress,
        isProcessing,
    } = useUploadVideo();

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors, isValid },
    } = useForm({
        mode: "onChange",
        defaultValues: {
            title: "",
            description: "",
            isPublished: true,
        },
    });

    const [videoFile, setVideoFile] = useState(null);
    const [thumbnailFile, setThumbnailFile] = useState(null);

    const [videoPreview, setVideoPreview] = useState("");
    const [thumbnailPreview, setThumbnailPreview] = useState("");

    useEffect(() => {
        return () => {
            if (videoPreview) URL.revokeObjectURL(videoPreview);
            if (thumbnailPreview) URL.revokeObjectURL(thumbnailPreview);
        };
    }, [videoPreview, thumbnailPreview]);

    const handleVideoSelect = (file) => {
        if (!file) return;

        setVideoFile(file);

        if (videoPreview) {
            URL.revokeObjectURL(videoPreview);
        }

        setVideoPreview(URL.createObjectURL(file));
    };

    const handleVideoChange = (e) => {
        handleVideoSelect(e.target.files?.[0]);
    };

    const handleThumbnailChange = (e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        setThumbnailFile(file);

        if (thumbnailPreview) {
            URL.revokeObjectURL(thumbnailPreview);
        }

        setThumbnailPreview(URL.createObjectURL(file));
    };

    const handleDrop = (e) => {
        e.preventDefault();

        const file = e.dataTransfer.files?.[0];

        if (file) {
            handleVideoSelect(file);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleCancel = () => {
        navigate(-1);
    };

    const onSubmit = (data) => {
        if (!videoFile || !thumbnailFile) return;

        const formData = new FormData();

        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("isPublished", data.isPublished);

        formData.append("videoFile", videoFile);
        formData.append("thumbnail", thumbnailFile);

        mutate(formData);
    };

    return (
        <section className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-foreground">
                    Upload Video
                </h1>

                <p className="mt-2 text-foreground">
                    Share your creations with the StreamSphere community.
                </p>
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-8"
            >
                <div className="grid grid-cols-1 items-start gap-8 xl:grid-cols-[2fr_1fr]">
                    <UploadDropzone
                        videoFile={videoFile}
                        preview={videoPreview}
                        uploadProgress={uploadProgress}
                        isUploading={isPending}
                        isProcessing={isProcessing}
                        isSuccess={isSuccess}
                        onFileChange={handleVideoChange}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                    />

                    <div className="space-y-4">
                        <Card className="rounded-2xl">
                            <VideoForm
                                register={register}
                                errors={errors}
                                watch={watch}
                                setValue={setValue}
                                disabled={isPending}
                            />
                        </Card>

                        <Card className="rounded-2xl">
                            <ThumbnailSelector
                                preview={thumbnailPreview}
                                onChange={handleThumbnailChange}
                                error={
                                    !thumbnailFile &&
                                    isError &&
                                    "Thumbnail is required"
                                }
                            />
                        </Card>
                    </div>
                </div>

                <UploadActions
                    onCancel={handleCancel}
                    isUploading={isPending}
                    isProcessing={isProcessing}
                    disabled={
                        !isValid ||
                        !videoFile ||
                        !thumbnailFile
                    }
                />
            </form>
        </section>
    );
}

export default UploadVideoPage;