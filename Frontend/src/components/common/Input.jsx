import { forwardRef } from "react";

const Input = forwardRef(
    (
        {
            className = "",
            id,
            error,
            type = "text",
            placeholder = "Enter the text here",
            label,
            leftIcon,
            rightIcon,
            ...props
        },
        ref
    ) => {
        return (
            <div>
                {label && (
                    <label
                        htmlFor={id}
                        className="block text-sm font-medium mb-1"
                    >
                        {label}
                    </label>
                )}

                <div
                    className={`
                        flex
                        items-center
                        gap-3
                        mt-2
                        w-full
                        px-4
                        py-3
                        rounded-lg
                        transition-all
                        duration-300
                        
                        ${
                            error
                                ? "ring-1 ring-red-500"
                                : "focus-within:ring-1 focus-within:ring-[#0066FF] focus-within:shadow-lg"
                        }
                    `}
                >
                    {leftIcon && (
                        <span className="text-gray-500">
                            {leftIcon}
                        </span>
                    )}

                    <input
                        ref={ref}
                        id={id}
                        type={type}
                        placeholder={placeholder}
                        className={`
                            flex-1
                            outline-none
                            bg-transparent
                            ${className}
                        `}
                        {...props}
                    />

                    {rightIcon && (
                        <span className="text-gray-500">
                            {rightIcon}
                        </span>
                    )}
                </div>

                {error && (
                    <p className="mt-1 text-sm text-red-500">
                        *{error}
                    </p>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";

export default Input;