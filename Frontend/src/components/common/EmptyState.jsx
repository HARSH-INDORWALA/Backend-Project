import Button from "./Button";

function EmptyState({
    icon,
    title,
    description,
    actionLabel,
    onAction,
    actions,
    className = "",
}) {
    return (
        <div className={`flex min-h-105 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card px-6 text-center ${className}`}>
            {icon && <div className="mb-6">{icon}</div>}

            <h2 className="text-2xl font-semibold text-foreground">
                {title}
            </h2>

            {description && (
                <p className="mt-3 max-w-md text-muted-foreground">
                    {description}
                </p>
            )}

            {actions ? (
                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                    {actions}
                </div>
            ) : (
                actionLabel &&
                onAction && (
                    <Button className="mt-8" onClick={onAction}>
                        {actionLabel}
                    </Button>
                )
            )}
        </div>
    );
}

export default EmptyState;