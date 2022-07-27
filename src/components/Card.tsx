import { CardProps } from "./Card.type";

const Card = ({title, body, footer, buttonLabel, handleClick}: CardProps) => {
    return (
        <div>
            <div className="card-title">{title}</div>
            <div className="card-body">{body}</div>
            {
                footer && <div className="card-footer">{footer}</div>
            }
            {
                (buttonLabel && handleClick) &&
                <button type="button" onClick={() =>handleClick()}>{buttonLabel}</button>
            }
        </div>
    );
};

export default Card;
