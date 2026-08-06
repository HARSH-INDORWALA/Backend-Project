import { useForm } from "react-hook-form";

import Button from "../common/Button";
import Input from "../common/Input";

function PlaylistForm({
    defaultValues = {
        name: "",
        description: "",
        isPublic : true,
    },
    submitLabel = "Create Playlist",
    isLoading,
    onSubmit,
    onCancel,
}) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues,
    });
    

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
                label="Playlist Name"
                placeholder="Enter playlist name"
                error={errors.name?.message}
                {...register("name", {
                    required: "Playlist name is required",
                    maxLength: {
                        value: 100,
                        message: "Playlist name cannot exceed 100 characters",
                    },
                })}
            />

            <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                    Description
                </label>

                <textarea
                    rows={5}
                    placeholder="Write something about this playlist..."
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition-colors focus:border-primary"
                    {...register("description", {
                        maxLength: {
                            value: 500,
                            message:
                                "Playlist description cannot exceed 500 characters",
                        },
                    })}
                />

                {errors.description && (
                    <p className="mt-2 text-sm text-red-500">
                        {errors.description.message}
                    </p>
                )}
                <label className="mb-3 block text-sm font-medium text-foreground">
                    Visibility
                </label>

                <div className="space-y-4 rounded-xl border border-border bg-background p-4">
                    <label className="flex cursor-pointer items-start gap-3">
                        <input
                            type="radio"
                            value="true"
                            {...register("isPublic")}
                        />

                        <div>
                            <p className="font-medium text-foreground">
                                Public
                            </p>

                            <p className="text-sm text-muted">
                                Anyone can view this playlist.
                            </p>
                        </div>
                    </label>

                    <label className="flex cursor-pointer items-start gap-3">
                        <input
                            type="radio"
                            value="false"
                            {...register("isPublic")}
                        />

                        <div>
                            <p className="font-medium text-foreground">
                                Private
                            </p>

                            <p className="text-sm text-muted">
                                Only you can view this playlist.
                            </p>
                        </div>
                    </label>
                </div>
            </div>

            <div className="flex justify-end gap-3">
                <Button
                    type="button"
                    variant="secondary"
                    onClick={onCancel}
                >
                    Cancel
                </Button>

                <Button
                    type="submit"
                    isLoading={isLoading}
                >
                    {submitLabel}
                </Button>
            </div>
        </form>
    );
}

export default PlaylistForm;