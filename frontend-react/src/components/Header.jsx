import React from 'react';
import Button from './Button';

const Header = () => {
    return (
       <>
       <nav className='navbar container py-4'>
        <a href="" className='navbar-brand text-light'>Stock Visual Portal</a>

        <div>
            <Button text='Login' design_classes='btn btn-outline-success mx-3 px-5'/>
            &nbsp;
            <Button text='Register' design_classes='btn btn-info px-5'/>
        </div>

       </nav>
       </>
    );
};

export default Header;