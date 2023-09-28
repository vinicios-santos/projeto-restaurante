import Login from '@pages/login';
import { Navigate } from 'react-router-dom';

export const PublicRoutes = (auth: boolean) => {
    return [
        { path: '/', element: auth ? <Navigate to="/dashboard" replace /> : <Login /> },
        { path: '*', element: <Navigate to='/' replace /> }
    ]
}