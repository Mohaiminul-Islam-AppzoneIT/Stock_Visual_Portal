import { useContext } from 'react';
import { AuthContext} from './authProvider'
import { Navigate } from 'react-router-dom'

const PublicRoute = ({children}) => {
    const { isLoggedIn } = useContext(AuthContext)

    return !isLoggedIn ? (
        children
    ):(
        <Navigate to={'/dashboard'}/>
    )
};

export default PublicRoute;