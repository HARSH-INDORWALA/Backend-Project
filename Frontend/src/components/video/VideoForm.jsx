import { Input } from "../common";

function VideoForm({
    register,
    errors,
    watch,
    setValue,
    disabled = false,
}) {
    return (
        <div className="space-y-4">
            {/* Video Details */}
            <div>
                <h2 className="text-xl font-semibold text-foreground">
                    Video Details
                </h2>

                <p className="mt-1 text-sm text-muted">
                    Provide basic information about your video.
                </p>
            </div>

            <Input
                label="Title"
                placeholder="Enter your video title"
                disabled={disabled}
                {...register("title", {
                    required: "Title is required",
                })}
                error={errors.title?.message}
            />

            <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                    Description
                </label>

                <textarea
                    rows={5}
                    placeholder="Tell viewers about your video..."
                    disabled={disabled}
                    {...register("description", {
                        required: "Description is required",
                    })}
                    className={`
                        w-full
                        rounded-lg
                        border 
                        border-border
                        bg-background
                        px-4
                        py-3
                        outline-none
                        transition-all
                        duration-300
                        resize-none
                        focus:ring-1
                        focus:ring-primary
                        text-foreground
                        ${
                            errors.description
                                ? "ring-1 ring-red-500"
                                : ""
                        }
                    `}
                />

                {errors.description && (
                    <p className="mt-1 text-sm text-red-500">
                        *{errors.description.message}
                    </p>
                )}
            </div>

            {/* Visibility */}
            <div>
                <h3 className="text-lg font-semibold text-foreground">
                    Visibility
                </h3>

                <p className="mt-1 text-sm text-muted">
                    Choose who can watch your video.
                </p>

                <div className="mt-5 space-y-4">
                    <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border p-4 transition-colors hover:border-primary">
                        <input
                            type="radio"
                            checked={watch("isPublished")}
                            disabled={disabled}
                            onChange={() =>
                                setValue(
                                    "isPublished",
                                    true
                                )
                            }
                        />

                        <div>
                            <p className="font-medium text-foreground">
                                Public
                            </p>

                            <p className="text-sm text-muted">
                                Anyone can discover and watch this video.
                            </p>
                        </div>
                    </label>

                    <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border p-4 transition-colors hover:border-primary">
                        <input
                            type="radio"
                            checked={!watch("isPublished")}
                            disabled={disabled}
                            onChange={() =>
                                setValue(
                                    "isPublished",
                                    false
                                )
                            }
                        />

                        <div>
                            <p className="font-medium text-foreground">
                                Private
                            </p>

                            <p className="text-sm text-muted">
                                Only you can access this video.
                            </p>
                        </div>
                    </label>
                </div>
            </div>
        </div>
    );
}

export default VideoForm;