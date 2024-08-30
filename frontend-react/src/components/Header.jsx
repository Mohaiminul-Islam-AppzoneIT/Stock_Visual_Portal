import Button from './Button';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
       <>
       <nav className='navbar container py-4'>
        <Link to={'/'} className='navbar-brand text-light'>Stock Visual Portal</Link>

        <div>
            <Button text='Login' RouteLink='/login' design_classes='btn btn-outline-success mx-3 px-5'/>
            &nbsp;
            <Button text='Register' RouteLink='/register' design_classes='btn btn-info px-5'/>
        </div>

       </nav>
       </>
    );
};

export default Header;