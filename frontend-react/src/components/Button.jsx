import React from 'react';

const Button = ({text, design_classes}) => {
    return (
        <>
            <button className={design_classes}>{text}</button>
        </>
    );
};

export default Button;