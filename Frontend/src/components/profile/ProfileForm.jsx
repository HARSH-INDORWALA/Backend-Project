import { useState } from "react";
import { useForm } from "react-hook-form";

import ImageUpload from "../common/ImageUpload";
import Input from "../common/Input";
import Button from "../common/Button";

function ProfileForm({ user }) {
    const [avatarPreview, setAvatarPreview] = useState(user?.avatar || "");
    const [coverPreview, setCoverPreview] = useState(user?.coverImage || "");

    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            fullName: user?.fullName || "",
            username: user?.username || "",
            avatar: null,
            coverImage: null,
        },
    });

    const handleImageChange = (field, setter) => (e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        setter(URL.createObjectURL(file));

        setValue(field, file);
    };

    const onSubmit = (data) => {
        console.log(data);

        // Backend Integration Later
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
        >

            <ImageUpload
                id="cover"
                label="Cover Image"
                variant="cover"
                preview={coverPreview}
                onChange={handleImageChange("coverImage", setCoverPreview)}
            />

            <ImageUpload
                id="avatar"
                label="Avatar"
                variant="avatar"
                preview={avatarPreview}
                onChange={handleImageChange("avatar", setAvatarPreview)}
            />

            <Input
                id="fullName"
                label="Full Name"
                {...register("fullName")}
                error={errors.fullName?.message}
            />

            <Button
                type="submit"
                className="rounded-full"
            >
                Save Changes
            </Button>

        </form>
    );
}

export default ProfileForm;