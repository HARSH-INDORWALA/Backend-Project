import { Mail, ArrowRight } from "lucide-react";
import Input from "../common/Input.jsx";
import Button from "../common/Button.jsx";
import PasswordInput from "../common/PasswordInput.jsx";
import {  useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import  {useLogin } from "../../hooks/auth/useLogin.js";
function LoginForm() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            login: "",
            password: "",
            rememberMe: false,
        },
    });

    const loginMutation = useLogin();

    const onSubmit = async (data) => {
    const payload = {
        email: data.login.includes("@")
            ? data.login
            : "",
        username: data.login.includes("@")
            ? ""
            : data.login,
        password: data.password,
    };

    try {
        const response = await loginMutation.mutateAsync(payload);
        
        navigate("/");
        return response;
    } catch (error) {
        console.error("LOGIN ERROR:",error.response?.data || error.message);
    }
};
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
        >
            <Input
                id="login"
                label="Email or Username"
                type="text"
                placeholder="Enter your email or username here"
                leftIcon={<Mail size={18} />}
                error={errors.login?.message}
                {...register("login", {
                    required: "Email or Username is required",
                })}
            />

            <PasswordInput
                id="login-password"
                label="Password"
                placeholder="Enter the Password"
                error={errors.password?.message}
                {...register("password", {
                    required: "Password is required",
                })}
            />

            <div className="flex items-center gap-5">
                <input
                    type="checkbox"
                    id="rememberMe"
                    className="size-4 rounded-md cursor-pointer"
                    {...register("rememberMe")}
                />

                <label
                    htmlFor="rememberMe"
                    className="text-md text-[#424656] cursor-pointer"
                >
                    Remember me for 30 days
                </label>
            </div>

            <Button
                type="submit"
                variant="primary"
                className="flex items-center justify-center rounded-full hover:shadow-[0_10px_30px_rgba(0,102,255,0.25)]"
            >
                Sign In
                <ArrowRight className="mx-4" />
            </Button>

            <p className="text-[#424656] text-center text-md">
                Don't have an account?{" "}
                <Link
                    to="/register"
                    className="hover:text-[#0066FF] text-blue-700"
                >
                    Sign up
                </Link>
            </p>
        </form>
    );
}

export default LoginForm;