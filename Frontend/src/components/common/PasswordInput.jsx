import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import Input from "./Input";

function PasswordInput({ id, label, placeholder = "Enter your password", error, ...props }) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <Input
            id={id}
            label={label}
            type={showPassword ? "text" : "password"}
            placeholder={placeholder}
            error={error}
            leftIcon={<Lock size={18} className="text-muted" />}
            rightIcon={
                <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className=" cursor-pointer text-slate-500 hover:text-slate-700 transition-colors "
                >
                    {showPassword ? (
                        <EyeOff size={18} />
                    ) : (
                        <Eye size={18} />
                    )}
                </button>
            }
            {...props}
        />
    );
}

export default PasswordInput;