import { Card } from "../common";
function AuthCard({ title, subtitle, children, className = "", ...props }) {
    return (
        <Card className={`w-full bg-white text-black max-w-md p-6 space-y-4 rounded-lg ${className}`} {...props}>
            <div className="space-y-2">
                <h2 className="text-3xl font-bold text-center text-black">
                    {title}
                </h2>
                <p className="text-black text-center">
                    {subtitle}
                </p>
            </div>
            {children}
        </Card>
    )

}

export default AuthCard;