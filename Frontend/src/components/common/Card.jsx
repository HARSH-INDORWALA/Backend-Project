function Card({ children, className = "", ...props }) {
    return (
        <div className={`bg-surface border border-border shadow-[0px_10px_30px_rgba(0,102,255,0.04)] p-4 ${className}`} {...props}>
            {children}
        </div>
    )
}

export default Card;