import { useState } from "react";
import { set, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, PasswordInput, ImageUpload } from "../common";
import { registerUser } from "../../services/authService.js";
function RegisterForm() {
    const navigate = useNavigate()
    const [avatarPreview, setAvatarPreview] = useState("");
    const [serverError, setServerError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            avatar: null,
            fullName: "",
            username: "",
            email: "",
            password: "",
        },
    });

    const handleAvatarChange = (e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        setValue("avatar", file, {
            shouldValidate: true,
        });

        setAvatarPreview(URL.createObjectURL(file));
    };

    const onSubmit = async (data) => {
        setServerError("");
        setIsSubmitting(true);
        try {
            const formData = new FormData();
            
            Object.entries(data).forEach(([key, value]) => {
                if (value) {
                    formData.append(key, value);
                }
            });
            const response = await registerUser(formData);
            navigate("/login", {
                                state: {
                                    message: "Account created successfully. Please login."
                                }
            });

        } catch (error) {
            setServerError(error.response?.data?.message || "An error occurred during registration.");
        }
        finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-2"
        >
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
            {/* Avatar Upload */}
            <ImageUpload
                id="avatar"
                label="Upload Avatar"
                preview={avatarPreview}
                onChange={handleAvatarChange}
                variant="avatar"
                error={errors.avatar?.message}
            />

            {/* Hidden field for RHF */}
            <input
                type="hidden"
                {...register("avatar", {
                    required: "Avatar is required",
                })}
            />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Input
                    id="fullName"
                    label="Full Name"
                    placeholder="Enter your full name"
                    error={errors.fullName?.message}
                    {...register("fullName", {
                        required: "Full Name is required",
                    })}
                />

                <Input
                    id="username"
                    label="Username"
                    placeholder="@username"
                    error={errors.username?.message}
                    {...register("username", {
                        required: "Username is required",
                    })}
                />
            </div>

            <Input
                id="email"
                type="email"
                label="Email Address"
                placeholder="Enter your email"
                error={errors.email?.message}
                {...register("email", {
                    required: "Email is required",
                })}
            />

            <PasswordInput
                id="register-password"
                label="Password"
                placeholder="Please enter the password"
                error={errors.password?.message}
                {...register("password", {
                    required: "Password is required",
                })}
            />

            <Button
                type="submit"
                className="h-14 w-full rounded-full"
                disabled={isSubmitting}
            >
                {isSubmitting ? "Creating Account..." : "Create Account"}
            </Button>

            <p className="text-center text-sm">
                Already have an account?{" "}
                <Link
                    to="/login"
                    className="
                        font-medium
                        text-[#0066FF]
                        hover:underline
                    "
                >
                    Sign In
                </Link>
            </p>
        </form>
    );
}

export default RegisterForm;