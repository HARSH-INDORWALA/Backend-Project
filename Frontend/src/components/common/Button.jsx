function Button({ children, className = "", type = "button", variant = "primary", isLoading = false, disabled = false, ...props }) {
    const variants = {
        primary:
            "bg-[#0066FF] text-white hover:bg-[#0050CB]",

        secondary:
            "bg-white text-[#0066FF] border border-[#0066FF] hover:bg-[#F4F7FA]",

        danger:
            "bg-red-600 text-white hover:bg-red-700",

        ghost:
            "bg-transparent border-0 text-foreground hover:bg-background"
    };

    return (
        <button
            type={type}
            disabled={disabled || isLoading}
            className={`${className} ${variants[variant]}
        px-6 py-3 font-medium 
        rounded-full
        transition-all
        duration-300
        cursor-pointer
        focus:outline-none
        focus:ring-2
        focus:ring-[#0066FF]
        focus:ring-offset-2
        disabled:opacity-50
        disabled:cursor-not-allowed
        `}
            {...props}>

            {isLoading ? 'Loading...' : children}
        </button>
    )

}

export default Button;