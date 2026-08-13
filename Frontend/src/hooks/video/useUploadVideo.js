import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadVideo } from "../../services/videoService";

export function useUploadVideo() {
    const queryClient = useQueryClient();

    const [uploadProgress, setUploadProgress] = useState(0);
    const [isProcessing, setIsProcessing] = useState(false);

    const mutation = useMutation({
        mutationFn: (formData) =>
            uploadVideo(formData, (event) => {
                if (event.total) {
                    const progress = Math.round(
                        (event.loaded * 100) / event.total
                    );

                    setUploadProgress(progress);
                }
            }),

        onMutate: () => {
            setUploadProgress(0);
            setIsProcessing(false);
        },

        onSuccess: () => {
            setIsProcessing(true);

            queryClient.invalidateQueries({
                queryKey: ["myVideos"],
            });

            setTimeout(() => {
                setIsProcessing(false);
            }, 800);
        },

        onError: () => {
            setUploadProgress(0);
            setIsProcessing(false);
        },
    });

    return {
        ...mutation,
        uploadProgress,
        isProcessing,
    };
}