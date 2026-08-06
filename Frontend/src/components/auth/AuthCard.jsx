import Card from "../common/Card";
function AuthCard({title,subtitle,children,className="",...props}){
    return (
        <Card className={`w-full bg-surface max-w-md p-6 space-y-4 rounded-lg ${className}`} {...props}>
            <div className="space-y-2">
                <h2 className="text-3xl font-bold text-center text-foreground">
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