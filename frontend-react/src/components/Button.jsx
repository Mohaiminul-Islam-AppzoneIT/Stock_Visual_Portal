import { Link } from 'react-router-dom';


const Button = ({text, design_classes, RouteLink}) => {
    return (
        <>
            <Link to={RouteLink} className={design_classes}>{text}</Link>
        </>
    );
};

export default Button;