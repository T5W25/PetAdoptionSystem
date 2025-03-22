import { PropsWithChildren } from "react"
import "./styles.css"


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