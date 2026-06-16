import { Camera } from "lucide-react";

function ImageUpload({
    id,
    label,
    preview,
    error,
    onChange,
    variant = "avatar",
    className = "",
}) {

    const variants = {
        avatar: "h-28 w-28 rounded-full",
        cover: "h-40 w-full rounded-xl",
        thumbnail: "aspect-video w-full rounded-xl",
    };

    return (
        <div className="flex flex-col items-center gap-3">
            <label
                htmlFor={id}
                className={`
                    ${variants[variant]}
                    flex
                    cursor-pointer
                    items-center
                    justify-center
                    overflow-hidden
                    border-2
                    border-dashed
                    border-slate-300
                    bg-slate-50
                    transition-all
                    duration-300
                    hover:border-[#0066FF]
                    hover:bg-blue-50
                    ${className}
                `}
            >
                {preview ? (
                    <img
                        src={preview}
                        alt={label}
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <Camera
                        size={32}
                        className="text-slate-500"
                    />
                )}
            </label>

            <input
                id={id}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onChange}
            />

            <p className="text-sm text-slate-500">
                {label}
            </p>

            {error && (
                <p className="text-sm text-red-500">
                    {error}
                </p>
            )}
        </div>
    );
}

export default ImageUpload;