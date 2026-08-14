import { Mail, ArrowRight } from "lucide-react";
import { PasswordInput, Input, Button } from "../common";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useLogin } from "../../hooks/auth";
import { useState } from "react";
function LoginForm() {
    const navigate = useNavigate();
    const location = useLocation();
    const [serverError, setServerError] = useState("");
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
        setServerError("");
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

            const from = location.state?.from?.pathname || "/";
            const search = location.state?.from?.search || "";
            const hash = location.state?.from?.hash || "";

            navigate(`${from}${search}${hash}`, { replace: true });
        } catch (error) {
            setServerError(error?.response?.data?.message || "An error occurred during login.");
        }
    };
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-2"
        >
            {serverError && (
                <div className=" rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-500 ">
                    {serverError}
                </div>
            )}
            <Input
                id="login"
                label="Email or Username"
                type="text"
                placeholder="Enter your email or username here"
                leftIcon={<Mail size={18} className="text-muted" />}
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
                    className="text-md text-foreground cursor-pointer"
                >
                    Remember me for 30 days
                </label>
            </div>

            <Button
                type="submit"
                variant="primary"
                disabled={loginMutation.isPending}
                className="flex items-center justify-center w-full rounded-full hover:shadow-[0_10px_30px_rgba(0,102,255,0.25)]"
            >
                {loginMutation.isPending ? "Signing in..." : "Sign in"}
                {!loginMutation.isPending &&
                    <ArrowRight className="mx-4" />
                }
            </Button>

            <p className="text-foreground text-center text-md">
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