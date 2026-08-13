import Button from "./Button";

function EmptyState({ icon, title, description, actionLabel, onAction, actions, className = "" }) {
    return (
        <div className={`flex flex-col items-center justify-center rounded-3xl border border-border bg-surface px-6 py-20 text-center ${className}`}>
            {icon && (
                <div className="mb-6 rounded-full bg-background p-5">
                    {icon}
                </div>
            )}

            <h2 className="text-2xl font-semibold text-foreground">
                {title}
            </h2>

            {description && (
                <p className="mt-3 max-w-md text-muted">
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
                    <Button
                        className="mt-8 w-auto px-6 py-2"
                        onClick={onAction}
                    >
                        {actionLabel}
                    </Button>
                )
            )}
        </div>
    );
}

export default EmptyState;