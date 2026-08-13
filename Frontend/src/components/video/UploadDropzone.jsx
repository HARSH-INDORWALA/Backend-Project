import { useRef } from "react";
import { CloudUpload, Check, X } from "lucide-react";
import { CircularProgress } from "@mui/material";

import { Button } from "../common";

function UploadDropzone({ videoFile, preview, uploadProgress, isUploading, isSuccess, onFileChange, onDrop, onRemove, onDragOver, }) {
    const inputRef = useRef(null);

    return (
        <div
            onDrop={onDrop}
            onDragOver={onDragOver}
            className={`relative overflow-hidden rounded-2xl bg-card transition-all duration-300
                ${preview
                    ? "border border-border"
                    : "border-2 border-dashed border-primary/40 hover:border-primary"
                }
            `}
        >
            {!preview ? (
                <div className="flex min-h-80 lg:min-h-120 flex-col items-center justify-center p-8 text-center">
                    <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                        <CloudUpload
                            size={42}
                            className="text-primary"
                        />
                    </div>

                    <h2 className="text-2xl font-semibold text-foreground">
                        Drag & Drop your video
                    </h2>

                    <p className="mt-3 max-w-md text-foreground">
                        Upload MP4, MOV or WEBM videos to StreamSphere.
                    </p>

                    <Button
                        className="mt-8"
                        onClick={() => inputRef.current?.click()}
                    >
                        Select Video
                    </Button>

                    <input
                        ref={inputRef}
                        type="file"
                        accept="video/*"
                        className="hidden"
                        onChange={onFileChange}
                    />
                </div>
            ) : (
                <div className="relative">
                    <video
                        src={preview}
                        controls={!isUploading}
                        className="aspect-video w-full object-cover"
                    />

                    <button
                        type="button"
                        onClick={onRemove}
                        disabled={isUploading}
                        className=" absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-white transition-all hover:bg-red-500 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 "
                        aria-label="Remove video"
                    >
                        <X size={20} />
                    </button>

                    {(isUploading || isSuccess) && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
                            {isUploading && uploadProgress < 100 && (
                                <>
                                    <div className="relative">
                                        <CircularProgress
                                            variant="determinate"
                                            value={uploadProgress}
                                            size={90}
                                            thickness={4}
                                        />

                                        <span className="absolute inset-0 flex items-center justify-center text-lg font-semibold text-white">
                                            {uploadProgress}%
                                        </span>
                                    </div>

                                    <p className="mt-6 text-lg font-medium text-white">
                                        Uploading...
                                    </p>
                                </>
                            )}

                            {isUploading && uploadProgress >= 100 && (
                                <>
                                    <CircularProgress
                                        size={90}
                                        thickness={4}
                                    />

                                    <p className="mt-6 text-lg font-medium text-white">
                                        Processing video...
                                    </p>
                                </>
                            )}

                            {isSuccess && (
                                <>
                                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-500">
                                        <Check
                                            size={40}
                                            className="text-white"
                                        />
                                    </div>

                                    <p className="mt-6 text-lg font-medium text-white">
                                        Upload Successful
                                    </p>
                                </>
                            )}
                        </div>
                    )}

                    <div className="border-t border-border px-5 py-4">
                        <h3 className="truncate text-sm font-medium text-foreground">
                            {videoFile?.name}
                        </h3>

                        <p className="mt-1 text-xs text-foreground">
                            {videoFile &&
                                `${(videoFile.size / (1024 * 1024)).toFixed(
                                    2
                                )} MB`}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UploadDropzone;