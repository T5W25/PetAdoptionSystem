import { PropsWithChildren } from "react"


interface CardProps extends PropsWithChildren {
    className?: string
}

const Card: React.FC<CardProps> = ({ children, className, ...rest }) => {
    return (
        <div className={`custom-card ${className}`} {...rest}>
            {children}
        </div>
    )
}

export default Card