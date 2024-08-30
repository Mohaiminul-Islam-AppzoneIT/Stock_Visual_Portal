import Button from './Button';
import { Link } from 'react-router-dom';
import { AuthContext } from '../authProvider';
import { useContext} from 'react';
import { useNavigate } from 'react-router-dom';
const Header = () => {
    const navigate = useNavigate()
    const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext)
    const handleLogout = () =>{
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        setIsLoggedIn(false)
        navigate('/login')
    }
    return (
       <>
       <nav className='navbar container py-4'>
        <Link to={'/'} className='navbar-brand text-light'>Stock Visual Portal</Link>

        <div>
            {
                isLoggedIn?(
                    <button className='btn btn-danger mx-3 px-5' onClick={handleLogout} >Logout</button>
                ):(
                    <>
                        <Button text='Login' RouteLink='/login' design_classes='btn btn-outline-success mx-3 px-5'/>
                        &nbsp;
                        <Button text='Register' RouteLink='/register' design_classes='btn btn-info px-5'/>
                    </>
                )
            }
           
        </div>

       </nav>
       </>
    );
};

export default Header;