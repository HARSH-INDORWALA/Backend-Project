import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import { Button, Input, ImageUpload } from "../common";

import { useUpdateUserAvatar, useUpdateUserCoverImage, useUpdateUserDetails } from "../../hooks/auth";

function ProfileForm({ user, onClose }) {
    const [avatarPreview, setAvatarPreview] = useState("");
    const [coverPreview, setCoverPreview] = useState("");
    const [serverError, setServerError] = useState("");

    const {
        register,
        setValue,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            fullName: user?.fullName || "",
            email: user?.email || "",
            avatar: user?.avatar|| null,
            coverImage: user?.coverImage || null
        },
    });

    const {
        mutateAsync: updateDetails,
        isPending: isUpdatingDetails,
    } = useUpdateUserDetails();

    const {
        mutateAsync: updateAvatar,
        isPending: isUpdatingAvatar,
    } = useUpdateUserAvatar();

    const {
        mutateAsync: updateCoverImage,
        isPending: isUpdatingCoverImage,
    } = useUpdateUserCoverImage();

    const isPending =
        isUpdatingDetails ||
        isUpdatingAvatar ||
        isUpdatingCoverImage;

    useEffect(() => {
        if (!user) return;

        reset({
            fullName: user.fullName || "",
            email: user.email || "",
            avatar: null,
            coverImage: null,
        });

        setAvatarPreview(user.avatar || "");
        setCoverPreview(user.coverImage || "");
    }, [user, reset]);

    const handleImageChange = (field, setter) => (value) => {
        const file = value?.target?.files?.[0] || value;

        if (!(file instanceof File)) return;

        setter(URL.createObjectURL(file));

        setValue(field, file, {
            shouldValidate: true,
            shouldDirty: true,
        });
    };

    const onSubmit = async (data) => {
        setServerError("");

        try {
            if (
                data.fullName !== user.fullName ||
                data.email !== user.email
            ) {
                await updateDetails({
                    fullName: data.fullName,
                    email: data.email,
                });
            }

            if (data.avatar instanceof File) {
                await updateAvatar(data.avatar);
            }

            if (data.coverImage instanceof File) {
                await updateCoverImage(data.coverImage);
            }

            onClose();

        } catch (error) {
            const message =
                error?.response?.data?.message ||
                "Something went wrong while updating your profile.";

            setServerError(message);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-1"
        >
            {/* Backend Error */}
            {serverError && (
                <div className="
                    rounded-lg
                    border
                    border-red-500/30
                    bg-red-500/10
                    px-4
                    py-3
                    text-sm
                    text-red-500
                ">
                    {serverError}
                </div>
            )}

            {/* Cover Image */}
            <ImageUpload
                id="cover"
                label="Cover Image"
                variant="cover"
                preview={coverPreview}
                onChange={handleImageChange(
                    "coverImage",
                    setCoverPreview
                )}
            />

            {/* Avatar */}
            <ImageUpload
                id="avatar"
                label="Avatar"
                variant="avatar"
                preview={avatarPreview}
                onChange={handleImageChange(
                    "avatar",
                    setAvatarPreview
                )}
            />

            {/* Full Name */}
            <Input
                id="fullName"
                label="Full Name"
                {...register("fullName", {
                    required: "Full Name is required",
                })}
                error={errors.fullName?.message}
            />

            {/* Email */}
            <Input
                id="email"
                label="Email"
                type="email"
                {...register("email", {
                    required: "Email is required",
                })}
                error={errors.email?.message}
            />

            {/* Submit */}
            <Button
                type="submit"
                disabled={isPending}
                className="rounded-full"
            >
                {isPending
                    ? "Saving..."
                    : "Save Changes"}
            </Button>
        </form>
    );
}

export default ProfileForm;