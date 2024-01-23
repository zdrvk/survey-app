import { createBrowserRouter } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import Surveys from './Components/Surveys';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import GuestLayout from './Components/GuestLayout';
import DefaulLayout from './Components/DefaultLayout';

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaulLayout />,
        children: [
            {
                path: '/',
                element: <Dashboard />,
            },
            {
                path: '/surveys',
                element: <Surveys />,
            },
        ],
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: 'login',
                element: <Login />,
            },
            {
                path: 'signup',
                element: <SignUp />,
            },
        ],
    },
]);

export default router;
