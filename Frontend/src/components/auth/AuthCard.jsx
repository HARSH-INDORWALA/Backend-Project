import Card from "../common/Card";
function AuthCard({title,subtitle,children,className="",...props}){
    return (
        <Card className={`w-full max-w-md p-10 space-y-6 rounded-lg ${className}`} {...props}>
            <div className="space-y-2">
                <h2 className="text-3xl font-bold text-center text-[#0A0C10]">
                    {title}
                </h2>
                <p className="text-[#424656] text-center">
                    {subtitle}
                </p>
            </div>
            {children}
        </Card>
    )

}

export default AuthCard;